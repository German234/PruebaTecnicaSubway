import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "../types/product";

type CartState = {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  addQuantityToProduct: (productId: string) => void;
  removeQuantityToProduct: (productId: string) => void;
  cleanCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (product) => {
        set((state) => ({ products: [...state.products, product] }));
      },
      cleanCart: () => {
        set({ products: [] });
      },
      removeProduct: (productId: string) => {
        set((state) => ({
          products: state.products.filter(
            (product) => product.id !== productId
          ),
        }));
      },
      addQuantityToProduct: (productId: string) => {
        set((state) => ({
          products: state.products.map((product) => {
            if (product.id === productId && product.quantity) {
              return { ...product, quantity: product.quantity + 1 };
            }
            return product;
          }),
        }));
      },
      removeQuantityToProduct: (productId: string) => {
        set((state) => ({
          products: state.products.map((product) => {
            if (product.id === productId && product.quantity) {
              return { ...product, quantity: product.quantity - 1 };
            }
            return product;
          }),
        }));
      },
    }),

    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
