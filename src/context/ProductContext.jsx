import React, { createContext, useContext, useState, useEffect } from "react";
import { products as initialProductsFromDB } from "../data/db";

// Create Context
export const ProductContext = createContext();

// ProductProvider component to provide product data to the rest of the app
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Load products from localStorage or db.js
  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts)); // Load from localStorage
    } else {
      setProducts(initialProductsFromDB); // if no products in local storage then load products from the db.js and save to the local storage after stringifying
      localStorage.setItem("products", JSON.stringify(initialProductsFromDB)); // Save to localStorage
    }
  }, []);

  // Function to synchronize changes to localStorage
  const updateLocalStorage = (updatedProducts) => {
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  // Function to add a product
  const addProduct = (newProduct) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts, newProduct];
      updateLocalStorage(updatedProducts);
      // this returned value is a new state value
      return updatedProducts;
    });
  };

  // Function to delete a product
  const deleteProduct = (id) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter((item) => item.id !== id);
      updateLocalStorage(updatedProducts);
      return updatedProducts;
    });
  };

  // Function to update a product
  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        return product.id === updatedProduct.id ? updatedProduct : product;
      });
      updateLocalStorage(updatedProducts);
      return updatedProducts;
    });
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, deleteProduct, updateProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use product context
export const useProducts = () => {
  return useContext(ProductContext);
};
