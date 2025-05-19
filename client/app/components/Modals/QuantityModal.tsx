
"use client";
import { FC, useState, useEffect } from "react";

interface QuantityModalProps {
  isOpen: boolean;
  stock: number;
  productName: string;
  onClose: () => void;
  onConfirm: (quantity: number) => void;
}

const QuantityModal: FC<QuantityModalProps> = ({
  isOpen,
  stock,
  productName,
  onClose,
  onConfirm,
}) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen) setQuantity(1);
  }, [isOpen]);

  if (!isOpen) return null;

  const inc = () => setQuantity((q) => Math.min(stock, q + 1));
  const dec = () => setQuantity((q) => Math.max(1, q - 1));

  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
    >
      <div className="relative w-full max-w-md p-4 max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          <div className="p-5 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              ¿Cuántos <span className="font-semibold">{productName}</span>?
            </h3>
            <div className="flex items-center justify-center mb-6 space-x-4">
              <button
                onClick={dec}
                className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500"
              >
                –
              </button>
              <span className="text-xl font-medium text-gray-900 dark:text-gray-100">
                {quantity}
              </span>
              <button
                onClick={inc}
                className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={() => onConfirm(quantity)}
              className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center dark:focus:ring-blue-800"
            >
              Agregar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantityModal;
