// src/graphql/index.ts

import { readFileSync } from "fs";
import path from "path";
import { authResolver } from "@/graphql/resolvers/auth.resolver";

// Read our GraphQL type definitions
const authTypes = readFileSync(
  path.join(__dirname, "./typeDefs/auth.graphql"),
  { encoding: "utf-8" },
);

// Combine all type definitions
export const typeDefs = `
    ${authTypes}
`;

// Combine all resolvers
export const resolvers = {
  Query: {
    ...authResolver.Query,
  },
  Mutation: {
    ...authResolver.Mutation,
  },
};
