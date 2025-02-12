import { useQuery } from "@apollo/client";
import { ALL_PRODUCTS_QUERY } from "@/graphql/queries/product.ts";

export const useProducts = () => {
  const { data, loading, error } = useQuery(ALL_PRODUCTS_QUERY);
  return {
    products: data?.allProducts || [],
    loading,
    error,
  };
};
