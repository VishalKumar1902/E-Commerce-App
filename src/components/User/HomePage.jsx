import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { CartContext } from "../../context/CartContext";

const HomePage = () => {
  const { products } = useContext(ProductContext); // Access products from ProductContext
  const { addToCart } = useContext(CartContext); // Access addToCart from CartContext

  const handleAddToCart = (product) => {
    addToCart(product, 1); // Add the product with a default quantity of 1
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-b text-center mb-8">Products</h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <li
            key={product.id}
            className="border rounded-lg shadow-lg p-4 flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4 text-center">
              {product.description}
            </p>
            <p className="text-lg font-semibold text-green-600 mb-4">
              ${product.price}
            </p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
              onClick={() => handleAddToCart(product)} // Call handleAddToCart on button click
            >
              Add To Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
