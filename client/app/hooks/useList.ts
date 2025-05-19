import { useQuery } from "@tanstack/react-query";
import { getLists, getListById, createList } from "../services/list.service";
import { CreateList, List } from "../types/list";
import {  ListResponse } from "../types/listsDetails";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateResponse } from "../types/generalResponse";

export const useLists = () => {
  return useQuery<List[], Error>({
    queryKey: ["lists"],
    queryFn: () => getLists(),
  });
};

export const useListCreate = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateResponse, Error, CreateList>({
    mutationFn: (newlistDetails) => createList(newlistDetails),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });
};

export const useListById = (id: string) => {
  return useQuery<ListResponse, Error>({
    queryKey: ["lists", id],
    queryFn: () => getListById(id),
    enabled: Boolean(id), 
  });
};
