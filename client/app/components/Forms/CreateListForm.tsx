"use client";

import { useRef } from "react";
import toast from "react-hot-toast";
import { useListCreate } from "@/app/hooks/useList";

interface CreateListFormProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function CreateListForm({ onSuccess, onError }: CreateListFormProps) {
  const { mutate } = useListCreate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCreateList = (event: React.MouseEvent) => {
    event.preventDefault();
    
    const listName = inputRef.current?.value;
    
    if (!listName) {
      toast.error("El nombre de la lista es requerido");
      return;
    }

    mutate({ name: listName, total_sold: 0 }, {
      onSuccess: (response) => {
        toast.success(`Lista creada con éxito`);
        if (inputRef.current) inputRef.current.value = "";
        onSuccess?.();
      },
      onError: (err: Error) => {
        toast.error(`Error al crear la lista`);
        console.error(err);
        onError?.(err);
      },
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white text-center">
        Nueva lista
      </h1>
      
      <div>
        <label 
          htmlFor="name" 
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Nombre:
        </label>
        <input
          ref={inputRef}
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Ej. Lista de compras"
          required
        />
      </div>
      
      <button
        onClick={handleCreateList}
        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Crear
      </button>
    </div>
  );
}