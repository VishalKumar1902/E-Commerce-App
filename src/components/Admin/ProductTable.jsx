import React, { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import EditProductModal from "./EditProductModal";
const ProductTable = () => {
  // getting context
  const { products, deleteProduct, updateProduct } = useContext(ProductContext);

  // states for the component
  // state to open or close a modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // state to trak a current selected product to be edited
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // function to edit the product info
  const handleSaveProduct = (updatedProduct) => {
    updateProduct(updatedProduct);
    closeModal();
  };

  // function that callse deleteProduct function from the context
  const removeProduct = (id) => {
    deleteProduct(id);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
              ID
            </th>
            <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
              Name
            </th>
            <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
              Price
            </th>
            <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                {product.id}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                {product.name}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                ${product.price}
              </td>
              <td className="border border-gray-300 px-4 py-2 flex items-center justify-center space-x-2">
                <button
                  className="bg-green-500 rounded-md px-2 text-white text-xs sm:text-sm"
                  onClick={() => openModal(product)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 rounded-md px-2 text-white text-xs sm:text-sm"
                  onClick={() => removeProduct(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <EditProductModal
          product={selectedProduct}
          onClose={closeModal}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
};

export default ProductTable;
