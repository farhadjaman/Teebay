import { useQuery } from "@apollo/client";
import { MY_TRANSACTIONS_QUERY } from "@/graphql/queries/transaction.ts";

export const useMyTransactions = () => {
  const { data, loading, error, refetch } = useQuery(MY_TRANSACTIONS_QUERY);

  return {
    transactions: data?.myTransactions || [],
    loading,
    error,
    refetch,
  };
};
