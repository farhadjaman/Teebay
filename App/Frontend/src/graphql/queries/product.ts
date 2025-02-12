import { gql } from "@apollo/client";

export const ALL_PRODUCTS_QUERY = gql`
  query AllProducts {
    allProducts {
      id
      title
      description
      price
      rentPrice
      rentOption
      createdAt
      categories {
        id
        name
      }
    }
  }
`;

export const PRODUCT_BY_ID_QUERY = gql`
  query ProductById($id: ID!) {
    productById(id: $id) {
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
      transactions {
        id
        type
        createdAt
        user {
          id
          name
        }
      }
    }
  }
`;

export const MY_PRODUCTS_QUERY = gql`
  query MyProducts {
    myProducts {
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
