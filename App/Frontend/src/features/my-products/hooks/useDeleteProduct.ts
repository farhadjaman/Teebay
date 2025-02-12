import { useMutation } from "@apollo/client";
import { DELETE_PRODUCT_MUTATION } from "@/graphql/mutations/product.ts";

export const useDeleteProduct = () => {
  const [deleteProductMutation, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
  );

  const deleteProduct = async (id: string) => {
    const response = await deleteProductMutation({
      variables: { id },
    });
    return response.data?.deleteProduct;
  };

  return { deleteProduct, loading, error };
};
