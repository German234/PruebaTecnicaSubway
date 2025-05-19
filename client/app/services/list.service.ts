import { api } from "./api";
import { CreateList, List } from "../types/list";
import { ListResponse } from "../types/listsDetails";
import { CreateResponse } from "../types/generalResponse";

export const createList = async (
  listData: CreateList
): Promise<CreateResponse> => {
  const response = await api.post<CreateResponse>("/lists", listData);
  return response.data;
};

export const getLists = async (): Promise<List[]> => {
  const response = await api.get<List[]>("/lists");
  return response.data;
};
export const getListById = async (id: string): Promise<ListResponse> => {
  const response = await api.get<ListResponse>(`/lists/${id}`);
  return response.data;
};

export const updateList = async (
  id: number,
  listData: Partial<Omit<List, "id">>
): Promise<List> => {
  const response = await api.put<List>(`/lists/${id}`, listData);
  return response.data;
};

export const deleteList = async (id: number): Promise<void> => {
  await api.delete(`/lists/${id}`);
};
