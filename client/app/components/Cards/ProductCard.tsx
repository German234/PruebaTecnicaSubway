"use client";
import { Product } from "../../types/product";
import { useCartStore } from "../../stores/cartStore";
import toast from "react-hot-toast";
import QuantityModal from "../Modals/QuantityModal";
import { useState } from "react";

interface CardProps {
  product: Product;
}

export default function ProductCard({ product }: CardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const addToCart = (quantity: number) => {
    product.quantity = quantity;
    useCartStore.getState().addProduct(product);
    toast.success(`Añadido x${quantity} ${product.name}`);
    closeModal();
  };

   return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 w-full">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 bg-gray-50 truncate pr-6">
        <h5 className="text-xl font-semibold text-gray-900 mb-2 truncate pr-4">
          {product.name}
        </h5>
        <p className="text-gray-700 text-sm mb-4 truncate pr-4">
          {product.description}
        </p>
        <p className="text-gray-700 text-sm font-extrabold mb-4">
          Stock disponible: {product.stock}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>
          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Add to Cart
            <svg
              className="w-4 h-4 ms-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 14 10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>

      <QuantityModal
        isOpen={isModalOpen}
        stock={product.stock || 1}
        productName={product.name}
        onClose={closeModal}
        onConfirm={addToCart}
      />
    </div>
  );
}
