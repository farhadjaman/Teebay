import { gql } from "@apollo/client";

export const MY_TRANSACTIONS_QUERY = gql`
  query MyTransactions {
    myTransactions {
      id
      type
      createdAt
      product {
        id
        title
        description
        price
        rentPrice
        rentOption
        createdAt
        updatedAt
        categories {
          id
          name
        }
      }
      user {
        id
        name
      }
    }
  }
`;

export const MY_PRODUCT_TRANSACTIONS_QUERY = gql`
  query MyProductTransactions {
    myProductTransactions {
      id
      type
      createdAt
      product {
        id
        title
        description
        price
        rentPrice
        rentOption
        createdAt
        updatedAt
        categories {
          id
          name
        }
      }
      user {
        id
        name
      }
    }
  }
`;
