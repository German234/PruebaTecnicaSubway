import { api } from "./api";

import { AddProductToList } from "../types/listsDetails";
import { CreateResponse } from "../types/generalResponse";

export const createListDetails = async (
  ListData: AddProductToList,
  id: string
): Promise<CreateResponse> => {
  const response = await api.post<CreateResponse>(`/listsDetails/${id}`, ListData);
  return response.data;
};

export const setBoughtListDetails = async (
  ids: string[]
): Promise<CreateResponse> => {
  console.log("ids", ids);
  const response = await api.put<CreateResponse>("/listsDetails", { ids });
  return response.data;
};

export const deleteListDetail = async (
  ListId: string,
  productId: string
): Promise<CreateResponse> => {
  const response = await api.delete<CreateResponse>(
    `/listsDetails/List/${ListId}/product/${productId}`
  );
  return response.data;
};
