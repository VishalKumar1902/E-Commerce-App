import React, { useState, useEffect } from "react";
import { orders as initialOrders } from "../../data/db"; // Assuming initial orders are in this file

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Load orders from localStorage or use initialOrders if not available
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders)); // Parse orders from localStorage
      } catch (error) {
        console.error("Failed to parse orders:", error);
        setOrders(initialOrders); // Fallback to initial orders if localStorage is corrupted
      }
    } else {
      setOrders(initialOrders); // Use initial orders if none exist in localStorage
    }
  }, []);

  // Function to generate unique Order ID
  const generateUniqueOrderId = (orders) => {
    if (orders.length === 0) return 1; // If no orders, start with ID 1
    const highestId = Math.max(...orders.map((order) => order.orderId));
    return highestId + 1; // Return the next highest ID
  };

  // Add new order
  const addOrder = (newOrder) => {
    const savedOrders = localStorage.getItem("orders");
    let orders = savedOrders ? JSON.parse(savedOrders) : [];

    // Generate a unique Order ID
    const newOrderId = generateUniqueOrderId(orders);

    // Assign the generated Order ID to the new order
    const orderWithId = { ...newOrder, orderId: newOrderId };

    // Add the new order to the orders array
    orders.push(orderWithId);

    // Save the updated orders back to localStorage
    localStorage.setItem("orders", JSON.stringify(orders));
    setOrders(orders); // Update state with new orders
  };

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.orderId === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders)); // Save back to localStorage
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Order ID: {order.orderId}
              </h3>
              <select
                value={order.status}
                onChange={(e) =>
                  updateOrderStatus(order.orderId, e.target.value)
                }
                className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(order.orderDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Paid:</strong>{" "}
                <span
                  className={`${
                    order.paid ? "text-green-600" : "text-red-600"
                  } font-medium`}
                >
                  {order.paid ? "Yes" : "No"}
                </span>
              </p>
              <p>
                <strong>Payment Method:</strong> {order.paymentMethod}
              </p>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              <p className="font-bold">Shipping Address:</p>
              <p>{order.address?.fullName || "Name not available"}</p>
              <p>{order.address?.street || "Street not available"}</p>
              <p>
                {order.address?.city || "City not available"},{" "}
                {order.address?.state || "State not available"},{" "}
                {order.address?.postalCode || "Postal Code not available"}
              </p>
              <p>{order.address?.country || "Country not available"}</p>
              <p>Phone: {order.address?.phone || "Phone not available"}</p>
            </div>
            <div>
              <p className="font-bold mb-2">Items:</p>
              <ul className="space-y-1 text-sm text-gray-700">
                {order.items.map((item, index) => (
                  <li key={index}>
                    Product ID: {item.productId} - Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageOrders;
