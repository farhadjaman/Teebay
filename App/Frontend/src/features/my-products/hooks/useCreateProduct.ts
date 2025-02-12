import {useMutation} from "@apollo/client";
import {CREATE_PRODUCT_MUTATION} from "@/graphql/mutations/product";
import { MY_PRODUCTS_QUERY } from "@/graphql/queries/product";
import {ProductInput} from "@/types.ts";

export const useCreateProduct = () => {
    const [createProductMutation, { loading, error, data }] = useMutation(CREATE_PRODUCT_MUTATION,{
        refetchQueries: [{ query: MY_PRODUCTS_QUERY }],
        awaitRefetchQueries: true,
    });

    const createProduct = async (input: ProductInput) => {
        const response = await createProductMutation({
            variables: { input },
        });
        return response.data?.createProduct;
    };

    return { createProduct, loading, error, data };
};