import { readFileSync } from "fs";
import path from "path";

import { authResolver } from "@/graphql/resolvers/auth.resolver";
import { productResolver } from "@/graphql/resolvers/product.resolver";
import { transactionResolver } from "@/graphql/resolvers/transaction.resolver";
import { categoryResolver } from "@/graphql/resolvers/category.resolver";

const authTypes = readFileSync(
  path.join(__dirname, "./typeDefs/auth.graphql"),
  "utf-8",
);
const productTypes = readFileSync(
  path.join(__dirname, "./typeDefs/product.graphql"),
  "utf-8",
);
const transactionTypes = readFileSync(
  path.join(__dirname, "./typeDefs/transaction.graphql"),
  "utf-8",
);
const categoryTypes = readFileSync(
  path.join(__dirname, "./typeDefs/category.graphql"),
  "utf-8",
);

export const typeDefs = `
  ${authTypes}
  ${productTypes}
  ${transactionTypes}
  ${categoryTypes}
`;

export const resolvers = {
  Query: {
    ...authResolver.Query,
    ...productResolver.Query,
    ...categoryResolver.Query,
  },
  Mutation: {
    ...authResolver.Mutation,
    ...productResolver.Mutation,
    ...transactionResolver.Mutation,
    ...categoryResolver.Mutation,
  },
  Product: {
    ...productResolver.Product,
  },
  Transaction: {
    ...transactionResolver.Transaction,
  },
};
