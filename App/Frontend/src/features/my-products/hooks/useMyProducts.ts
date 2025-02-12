import { useQuery } from "@apollo/client";
import { MY_PRODUCTS_QUERY } from "@/graphql/queries/product.ts";

export const useMyProducts = () => {
  const { data, loading, error, refetch } = useQuery(MY_PRODUCTS_QUERY);
  return {
    products: data?.myProducts || [],
    loading,
    error,
    refetch,
  };
};
