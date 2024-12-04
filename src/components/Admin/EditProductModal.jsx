import React, { useState, useEffect } from "react";

const EditProductModal = ({ product, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Product Name
          </label>
          <input
            id="name"
            name="name"
            value={editedProduct.name}
            onChange={handleChange}
            className="w-full px-2 py-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium mb-1">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            value={editedProduct.price}
            onChange={handleChange}
            className="w-full px-2 py-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Description
          </label>
          <input
            id="description"
            name="description"
            value={editedProduct.description}
            onChange={handleChange}
            className="w-full px-2 py-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="stock" className="block text-sm font-medium mb-1">
            Stock
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            value={editedProduct.stock}
            onChange={handleChange}
            className="w-full px-2 py-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
