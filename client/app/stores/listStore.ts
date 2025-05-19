import { create } from "zustand";
import { getLists } from "../services/list.service";
import { List } from "../types/list";

interface listsState {
  lists: List[];
  isLoading: boolean;
  error: Error | null;
  fetchlists: () => Promise<void>;
  updateShopTotal: (ListId: string, newTotal: number) => void;
}

export const useListsStore = create<listsState>((set) => ({
  lists: [],
  isLoading: false,
  error: null,

  fetchlists: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getLists();
      set({ lists: data, isLoading: false });
    } catch (err: any) {
      set({ error: err, isLoading: false });
    }
  },

  updateShopTotal: (ListId, newTotal) => {
    set((state) => ({
      lists: state.lists.map((h) =>
        h.id === ListId ? { ...h, total_sold: newTotal.toString() } : h
      ),
    }));
  },
}));
