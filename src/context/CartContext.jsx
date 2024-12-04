import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext"; // Import AuthContext to get current user

// Create the CartContext
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext); // Get currentUser from AuthContext

  // State for the cart
  const [cart, setCart] = useState([]);

  // State for the orders
  const [orders, setOrders] = useState([]);

  // Load cart and orders when currentUser changes
  useEffect(() => {
    if (currentUser) {
      // Fetch saved cart for the current user
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(savedCart.filter((item) => item.userId === currentUser.id));

      // Fetch saved orders for the current user
      const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

      // Filter orders to only include those that belong to the current user
      const userOrders = savedOrders.filter(
        (order) => order.userId === currentUser.id
      );

      setOrders(userOrders); // Set orders to state
    } else {
      setCart([]);
      setOrders([]);
    }
  }, [currentUser]); // Re-run whenever the currentUser changes

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = savedCart.filter(
        (item) => item.userId !== currentUser.id
      );
      updatedCart.push(
        ...cart.map((item) => ({ ...item, userId: currentUser.id }))
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  }, [cart, currentUser]);

  // Save orders to localStorage when they change
  useEffect(() => {
    if (currentUser) {
      const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

      // Filter out canceled orders before adding new ones
      const updatedOrders = savedOrders.filter(
        (order) => order.userId !== currentUser.id
      );
      updatedOrders.push(...orders); // Add the current orders to localStorage

      // Update localStorage with the new list of orders
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
    }
  }, [orders, currentUser]); // Run this effect when orders or currentUser change

  // Add product to cart
  const addToCart = (product, quantity = 1) => {
    if (!currentUser) return;

    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.product.id === product.id
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    if (!currentUser) return;

    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  };

  // Update quantity of product in cart
  const updateCartItem = (productId, newQuantity) => {
    if (!currentUser) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Calculate total value of the cart
  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );
  };

  // Get the next available orderId
  const getNextOrderId = () => {
    let lastOrderId = localStorage.getItem("lastOrderId");
    if (!lastOrderId) {
      lastOrderId = 1;
    } else {
      lastOrderId = parseInt(lastOrderId) + 1;
    }
    localStorage.setItem("lastOrderId", lastOrderId); // Save the new lastOrderId
    return lastOrderId;
  };

  // Place an order
  const placeOrder = (orderDetails) => {
    if (!currentUser) return;

    const newOrder = {
      ...orderDetails,
      userId: currentUser.id,
      orderId: getNextOrderId(), // Assign unique orderId
      status: "Processing",
      orderDate: new Date().toISOString(),
      paid: false,
    };

    setOrders((prevOrders) => {
      const updatedOrders = [...prevOrders, newOrder];
      return updatedOrders;
    });

    setCart([]); // Clear the cart after placing an order
  };

  // Cancel an order
  const cancelOrder = (orderId) => {
    setOrders((prevOrders) => {
      // Remove the canceled order from state
      const updatedOrders = prevOrders.filter(
        (order) => order.orderId !== orderId
      );
      return updatedOrders;
    });

    // Remove the canceled order from localStorage
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedAllOrders = savedOrders.filter(
      (order) => order.orderId !== orderId
    );
    localStorage.setItem("orders", JSON.stringify(updatedAllOrders)); // Update localStorage
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        removeFromCart,
        updateCartItem,
        calculateTotal,
        placeOrder,
        cancelOrder, // Expose cancelOrder function
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
