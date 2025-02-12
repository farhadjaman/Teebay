import { useQuery } from "@apollo/client";
import { MY_PRODUCT_TRANSACTIONS_QUERY } from "@/graphql/queries/transaction.ts";

export const useMyProductTransactions = () => {
  const { data, loading, error, refetch } = useQuery(
    MY_PRODUCT_TRANSACTIONS_QUERY,
  );

  return {
    transactions: data?.myProductTransactions || [],
    loading,
    error,
    refetch,
  };
};
