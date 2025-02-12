import { useQuery } from "@apollo/client";
import { PRODUCT_BY_ID_QUERY } from "@/graphql/queries/product";

export const useProduct = (id: string) => {
  const { data, loading, error, refetch } = useQuery(PRODUCT_BY_ID_QUERY, {
    variables: { id },
    skip: !id,
  });

  return {
    product: data?.productById,
    loading,
    error,
    refetch,
  };
};
