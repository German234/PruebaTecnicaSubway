import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/product.service";

export const useProducts = () => {
  const productQuery = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  return {
    productQuery,
  };
};
