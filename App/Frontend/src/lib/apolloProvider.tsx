import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ReactNode } from "react";
import { tokenVar } from "@/cache";
import { env } from "@/config/env.ts";

interface ApolloProviderProps {
  children: ReactNode;
}

const httpLink = createHttpLink({
  uri: `${env.API_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = tokenVar();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const ApolloWrapper = ({ children }: ApolloProviderProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
