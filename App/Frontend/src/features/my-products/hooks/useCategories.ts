import { ALL_CATEGORIES_QUERY } from "@/graphql/queries/category.ts";
import { useQuery } from "@apollo/client";

export const useCategories = () => {
  const { data, loading, error, refetch } = useQuery(ALL_CATEGORIES_QUERY);

  return {
    categories: data?.allCategories || [],
    loading,
    error,
    refetch,
  };
};
