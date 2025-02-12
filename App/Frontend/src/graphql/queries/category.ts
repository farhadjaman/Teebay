import { gql } from "@apollo/client";

export const ALL_CATEGORIES_QUERY = gql`
  query AllCategories {
    allCategories {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const CATEGORY_BY_ID_QUERY = gql`
  query CategoryById($id: ID!) {
    categoryById(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
