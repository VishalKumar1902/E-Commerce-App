import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext

const CartPage = () => {
  const { cart, calculateTotal, placeOrder, removeFromCart } =
    useContext(CartContext);
  const { currentUser } = useContext(AuthContext); // Get currentUser from AuthContext
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    phone: "",
    paymentMethod: "Cash on Delivery", // Default payment method
  });

  if (!currentUser) {
    // If no user is logged in, display the login prompt
    return (
      <div className="text-center">
        <h2>Please log in to view your cart.</h2>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitOrder = () => {
    if (
      !formData.fullName ||
      !formData.street ||
      !formData.city ||
      !formData.state ||
      !formData.country ||
      !formData.postalCode ||
      !formData.phone
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const orderDetails = {
      orderId: Date.now(),
      userId: currentUser.id, // Use currentUser's ID here
      status: "Pending",
      orderDate: new Date().toISOString(),
      paid: formData.paymentMethod !== "Cash on Delivery",
      paymentMethod: formData.paymentMethod,
      address: {
        fullName: formData.fullName,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        postalCode: formData.postalCode,
        phone: formData.phone,
      },
      items: cart.map((cartItem) => ({
        productId: cartItem.product.id,
        quantity: cartItem.quantity,
      })),
    };

    placeOrder(orderDetails);
    setOrderPlaced(true);
    setIsFormOpen(false); // Close the form after submission
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>

      {orderPlaced && (
        <div className="bg-green-100 text-green-700 p-4 mb-8 rounded-md text-center">
          🎉 Your order has been placed successfully!
        </div>
      )}

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="grid grid-cols-1 gap-8 mb-8">
            {cart.map((cartItem, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg shadow-lg"
              >
                <img
                  src={cartItem.product.image}
                  alt={cartItem.product.name}
                  className="w-24 h-24 object-cover rounded-md mr-4"
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    {cartItem.product.name}
                  </h2>
                  <p>Quantity: {cartItem.quantity}</p>
                  <p>Total: ${cartItem.product.price * cartItem.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(cartItem.product.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <h2 className="text-lg font-semibold">
            Total Value: ${calculateTotal()}
          </h2>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition mt-4"
          >
            Place Order
          </button>
        </>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
            <form className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="border p-2 rounded-md"
              />
              <input
                type="text"
                name="street"
                placeholder="Street Address"
                value={formData.street}
                onChange={handleInputChange}
                className="border p-2 rounded-md"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="border p-2 rounded-md"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                className="border p-2 rounded-md"
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleInputChange}
                className="border p-2 rounded-md"
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="border p-2 rounded-md"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="border p-2 rounded-md"
              />
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="border p-2 rounded-md"
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Card">Credit/Debit Card</option>
                <option value="UPI">UPI</option>
              </select>
            </form>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsFormOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitOrder}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
              >
                Submit Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
