import { useMutation } from "@apollo/client";
import { CREATE_TRANSACTION_MUTATION } from "@/graphql/mutations/transaction";
import { MY_TRANSACTIONS_QUERY } from "@/graphql/queries/transaction.ts";

export const useCreateTransaction = () => {
  const [createTransactionMutation] = useMutation(CREATE_TRANSACTION_MUTATION, {
    refetchQueries: [MY_TRANSACTIONS_QUERY],
    awaitRefetchQueries: true,
  });
  const createTransaction = async (productId: string, type: "BUY" | "RENT") => {
    const input = { productId, type };
    const { data } = await createTransactionMutation({ variables: { input } });
    return data.createTransaction;
  };

  return { createTransaction };
};
