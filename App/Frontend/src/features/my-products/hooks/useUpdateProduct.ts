import { useMutation } from "@apollo/client";
import { PRODUCT_BY_ID_QUERY } from "@/graphql/queries/product";
import { UPDATE_PRODUCT_MUTATION } from "@/graphql/mutations/product";

interface UpdateProductInput {
  title: string;
  description: string;
  price: number;
  rentPrice: number;
  rentOption: string;
  categoryIds: string[];
}

export const useUpdateProduct = () => {
  const [updateProduct, { loading, error }] = useMutation(
    UPDATE_PRODUCT_MUTATION,
    {
      refetchQueries: [PRODUCT_BY_ID_QUERY],
    },
  );

  const handleUpdateProduct = async (id: string, input: UpdateProductInput) => {
    const response = await updateProduct({
      variables: { id, input },
    });
    return response.data.updateProduct;
  };

  return {
    updateProduct: handleUpdateProduct,
    loading,
    error,
  };
};
