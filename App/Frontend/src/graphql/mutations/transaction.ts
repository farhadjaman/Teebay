import { gql } from "@apollo/client";

export const CREATE_TRANSACTION_MUTATION = gql`
  mutation CreateTransaction($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      id
      type
      createdAt
      product {
        id
        title
      }
      user {
        id
        name
      }
    }
  }
`;
