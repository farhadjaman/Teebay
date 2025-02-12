import { useMutation } from "@apollo/client";
import { CREATE_TRANSACTION_MUTATION } from "@/graphql/mutations/transaction";

export const useTransaction = () => {
  const [createTransactionMutation] = useMutation(CREATE_TRANSACTION_MUTATION);
  const createTransaction = async (productId: string, type: "BUY" | "RENT") => {
    const input = { productId, type };
    const { data } = await createTransactionMutation({ variables: { input } });
    return data.createTransaction;
  };

  return { createTransaction };
};
