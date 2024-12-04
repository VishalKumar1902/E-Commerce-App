import React, { useState } from "react";
import ProductTable from "./ProductTable";

import { useProducts } from "../../context/ProductContext";

const AdminDashboard = () => {
  const [image, setImage] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [productPrice, setProductPrice] = useState(0);

  // Use addProduct from context
  const { products, addProduct } = useProducts();

  // function to add new product
  const addNewProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: products.length + 1,
      name: productName,
      description,
      price: productPrice,
      stock,
      image,
    };
    // Add the new product to your product list here
    addProduct(newProduct);

    // clear all the states as wll
    setImage("");
    setProductName("");
    setStock(0);
    setDescription("");
    setProductPrice(0);

    console.log(products);
  };

  return (
    <div className="container mx-auto px-6">
      <h1 className="text-3xl font-semibold text-center mb-8 mt-5">
        Admin Dashboard
      </h1>
      <form
        className="space-y-4 max-auto p-6 border border-gray-300 rounded-lg shadow-lg mb-8"
        onSubmit={addNewProduct}
      >
        {/* Image URL */}
        <div>
          <label htmlFor="image" className="block text-lg font-semibold mb-1">
            Image URL
          </label>
          <input
            id="image"
            type="text"
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        {/* Product Name */}
        <div>
          <label
            htmlFor="productName"
            className="block text-lg font-semibold mb-1"
          >
            Product Name
          </label>
          <input
            id="productName"
            type="text"
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        {/* Product Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-lg font-semibold mb-1"
          >
            Product Description
          </label>
          <input
            id="description"
            type="text"
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Product Price */}
        <div>
          <label
            htmlFor="productPrice"
            className="block text-lg font-semibold mb-1"
          >
            Product Price
          </label>
          <input
            id="productPrice"
            type="number"
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>

        {/* Stock */}
        <div>
          <label htmlFor="stock" className="block text-lg font-semibold mb-1">
            Stock
          </label>
          <input
            id="stock"
            type="number"
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        {/* Add Product Button */}
        <div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-blue-500"
          >
            Add Product
          </button>
        </div>
      </form>

      <h2 className="text-2xl font-semibold text-center mb-8 pt-3">
        All Products
      </h2>
      <ProductTable />
    </div>
  );
};

export default AdminDashboard;
