import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../context/CartContext"; // Import CartContext to access orders
import { AuthContext } from "../../context/AuthContext";

const Orders = () => {
  const { currentUser } = useContext(AuthContext); // Get current user from AuthContext
  const { orders, cancelOrder } = useContext(CartContext); // Get orders and cancelOrder from CartContext

  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    if (!currentUser) return; // If no user, do nothing

    // Filter orders to only include the ones that belong to the current user
    const userOrders = orders.filter(
      (order) => order.userId === currentUser.id
    );
    setUserOrders(userOrders);
  }, [currentUser, orders]); // Re-run whenever currentUser or orders change

  const handleCancelOrder = (orderId) => {
    cancelOrder(orderId); // Call cancelOrder from context
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Your Orders</h1>

      {userOrders.length > 0 ? (
        userOrders.map((order) => (
          <div
            key={order.orderId}
            className="border p-4 rounded-lg shadow-md mb-4 flex justify-between items-center"
          >
            <div className="flex-1">
              <p className="text-lg font-semibold">Order ID: {order.orderId}</p>
              <p className="text-sm text-gray-500">
                Order Date: {new Date(order.orderDate).toLocaleDateString()}
              </p>
              <p
                className={`mt-2 text-sm ${
                  order.status === "Processing"
                    ? "text-yellow-500"
                    : order.status === "Shipped"
                    ? "text-blue-500"
                    : "text-green-500"
                }`}
              >
                Status: {order.status}
              </p>
            </div>
            <button
              onClick={() => handleCancelOrder(order.orderId)}
              className={`bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition ${
                order.status === "Shipped" || order.status === "Delivered"
                  ? "hidden"
                  : ""
              }`}
            >
              Cancel Order
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
