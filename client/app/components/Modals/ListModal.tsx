"use client";

import React, { useEffect, useState } from "react";
import { Trash2, Check } from "lucide-react";
import { useListDetailsStore } from "../../stores/listDetailsStore";

interface ListModalProps {
  listId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ListModal({
  listId,
  isOpen,
  onClose,
}: ListModalProps) {
  const details = useListDetailsStore((s) => s.details);
  const ListDetailsTotal = useListDetailsStore((s) => s.shopTotal);
  const totalBought = useListDetailsStore((s) => s.totalBought);
  const totalProducts = useListDetailsStore((s) => s.totalProducts);
  const isLoading = useListDetailsStore((s) => s.isLoading);
  const error = useListDetailsStore((s) => s.error);
  const fetchDetails = useListDetailsStore((s) => s.fetchDetails);
  const markAsBought = useListDetailsStore((s) => s.markAsBought);
  const removeDetail = useListDetailsStore((s) => s.removeDetail);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchDetails(listId);
      setSelectedIds([]);          
    }
  }, [isOpen, listId, fetchDetails]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleBatchBuy = () => {
    console.log("Selected IDs:", selectedIds);
    if (selectedIds.length === 0) return;
    markAsBought(selectedIds);
    setSelectedIds([]);     
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Cerrar modal"
        >
          X
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Detalles de la lista
        </h2>

        <div className="mb-4 flex justify-between items-center">
          <span className="font-medium text-gray-600">Total de la lista</span>
          <span className="text-lg font-semibold text-gray-900">
            ${ListDetailsTotal.toFixed(2)}
          </span>
        </div>

        {isLoading && <p className="text-gray-700">Cargando…</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}

        {!isLoading && !error && details.length > 0 && (
          <>
            <div className="flex justify-end mb-2">
                <div className="mr-4 text-sm text-gray-700 flex-1 text-left">
                Comprados: {totalBought} / {totalProducts}
                </div>
              <button
                onClick={handleBatchBuy}
                disabled={selectedIds.length === 0}
                className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
              >
                <Check className="w-4 h-4 mr-1" />
                Marcar seleccionados
              </button>
            </div>

            <ul className="divide-y divide-gray-200">
              {details.map((item) => (
                <li
                  key={item.id}
                  className="py-3 flex justify-between items-center"
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      disabled={item.isBought}
                      checked={selectedIds.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded"
                    />

                    <div>
                      <p
                        className={
                          item.isBought
                            ? "font-semibold line-through text-gray-400"
                            : "font-semibold text-gray-900"
                        }
                      >
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Cantidad: {item.quantity_sold} &nbsp;|&nbsp; Total:{" "}
                        <span className="font-medium text-gray-900">
                          ${item.totalProduct.toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        removeDetail(listId, item.product.id)
                      }
                      className="p-1 rounded hover:bg-gray-100"
                      title="Eliminar detalle"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {!isLoading && !error && details.length === 0 && (
          <p className="text-gray-600">No hay productos.</p>
        )}
      </div>
    </div>
  );
}
