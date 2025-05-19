import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getListById } from "../services/list.service";
import {
  setBoughtListDetails,
  deleteListDetail,
} from "../services/listDetails.service";
import {
  ListResponse,
  ListProductDetail,
} from "../types/listsDetails";
import { useListsStore } from "./listStore";

interface ListDetailsState {
  listId: string | null;
  shopTotal: number;
  details: ListProductDetail[];
  totalBought: number;
  totalProducts: number;
  isLoading: boolean;
  error: Error | null;

  fetchDetails: (listId: string) => Promise<void>;
  markAsBought: (ids: string[]) => Promise<void>;
  removeDetail: (listId: string, productId: string) => Promise<void>;
}

export const useListDetailsStore = create<ListDetailsState>()(
  persist(
    (set, get) => ({
      listId: null,
      shopTotal: 0,
      details: [],
      totalBought: 0,
      totalProducts: 0,
      isLoading: false,
      error: null,

      fetchDetails: async (listId) => {
        set({ isLoading: true, error: null, listId });
        try {
          const res: ListResponse = await getListById(listId);
          set({
            shopTotal: res.total_sold,
            details: res.listXProduct,
            totalBought: res.totalBought,
            totalProducts: res.totalProducts,
            isLoading: false,
          });
        } catch (err: any) {
          set({ error: err, isLoading: false });
        }
      },
      
      markAsBought: async (ids) => {
        await setBoughtListDetails(ids);
        set((state) => ({
          details: state.details.map((d) =>
            ids.includes(d.id) ? { ...d, isBought: true } : d
          ),
          totalBought: state.totalBought + ids.length
        }));
      },

      removeDetail: async (listId, productId) => {
        await deleteListDetail(listId, productId);

        set((state) => {
          const detailToRemove = state.details.find(
            (d) => d.product.id === productId
          );

          
          const newTotalProducts = state.totalProducts > 0 ? state.totalProducts - 1 : 0;
          if (detailToRemove) {
            const newTotalBought = detailToRemove.isBought
              ? state.totalBought - 1
              : state.totalBought;
            set({ totalBought: newTotalBought });
          }
          const newshopTotal = detailToRemove
            ? state.shopTotal - detailToRemove.totalProduct
            : state.shopTotal;
          useListsStore.getState().updateShopTotal(
            listId,
            newshopTotal
          );
          return {
            shopTotal: newshopTotal,
            totalProducts: newTotalProducts,
            details: state.details.filter(
              (d) => d.product.id !== productId
            ),
          };
        });
      },
    }),
    {
      name: "list-details-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
