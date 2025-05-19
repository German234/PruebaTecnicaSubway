"use client";
import toast from "react-hot-toast";
import { useCartStore } from "../../stores/cartStore";
import { useListDetails } from "@/app/hooks/useListDetails";
import { AddProductToList } from "@/app/types/listsDetails";
import { useState } from "react";
import { ListDropdown } from "../ListDropdown";
export default function CheckoutCard() {
  const products = useCartStore((state) => state.products);
  const total = products.reduce(
    (sum, p) => sum + p.price * (p.quantity ?? 1),
    0 
  );

  const [selectedListId, setSelectedListId] = useState<string | null>(null);

  const handleListChange = (listId: string) => {
    setSelectedListId(listId);
    console.log("Selected List ID:", listId);
  };

  const { mutate } = useListDetails();

  const buildListDetailsDto = (): AddProductToList => ({
    id: selectedListId ?? "",
    products: products.map((p) => ({
      productId: p.id,
      quantity_sold: p.quantity ?? 1,
      totalProduct: p.price * (p.quantity ?? 1),
    })),
    totalGeneral: parseFloat(total.toFixed(2)),
  });

  const handleCheckout = () => {
    const ListDetailsData = buildListDetailsDto();
    console.log("ListDetails Data:", ListDetailsData);

    mutate(ListDetailsData, {
      onSuccess: (response) => {
        toast.success(response.message);
        useCartStore.getState().cleanCart();
      },
      onError: (err: Error) => {
        toast.error(`Error al procesar agregar carritos a la lista`);
        console.log(err);
      },
    });
  };

  return (
    <div className="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Total a pagar
      </h2>

      <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white mb-6">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <ListDropdown 
        selectedListId={selectedListId} 
        onListChange={handleListChange} 
      />

      <button
        onClick={handleCheckout}
        className="w-full inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
      >
        Checkout
      </button>
    </div>
  );
}