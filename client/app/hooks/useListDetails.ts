import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createListDetails, deleteListDetail, setBoughtListDetails } from "../services/listDetails.service";
import { AddProductToList } from "../types/listsDetails";
import { CreateResponse } from "../types/generalResponse";

export const useListDetails = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateResponse, Error, AddProductToList>({
    mutationFn: (newList) => createListDetails(newList, newList.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });
};

export const useSetBoughtListDetails = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CreateResponse,
    Error,
    { ListId: string; ids: string[] }
  >({
    mutationFn: ({ ids }) => setBoughtListDetails(ids),
    onSuccess: (_data, { ListId }) => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      queryClient.invalidateQueries({ queryKey: ["lists", ListId] });
    },
  });
};

export const useDeleteListDetail = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CreateResponse,
    Error,
    { ListId: string; productId: string }
  >({
    mutationFn: ({ ListId, productId }) =>
      deleteListDetail(ListId, productId),
    onSuccess: (_data, { ListId }) => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      queryClient.invalidateQueries({ queryKey: ["lists", ListId] });
    },
  });
};
