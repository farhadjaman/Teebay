import { gql } from "@apollo/client";

    export const CREATE_PRODUCT_MUTATION = gql`
      mutation CreateProduct($input: ProductInput!) {
        createProduct(input: $input) {
          id
          title
          description
          price
          rentPrice
          rentOption
          createdAt
          updatedAt
          owner {
            id
            name
          }
          categories {
            id
            name
          }
        }
      }
    `;

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct($id: ID!, $input: ProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      title
      description
      price
      rentPrice
      rentOption
      createdAt
      updatedAt
      owner {
        id
        name
      }
      categories {
        id
        name
      }
    }
  }
`;

export const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;
