import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// graphql
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs, resolvers } from "@/graphql/server";
import { getUserFromToken } from "@/graphql/utils/auth.utils";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

const bootstrapServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        const userId = getUserFromToken(req);
        return { userId };
      },
    }),
  );

  app.get("/health", (_, res) => {
    res.send("health check");
  });

  app.listen(port, () => {
    console.log(`🚀 Express ready at http://localhost:${port}`);
    console.log(`🚀 Graphql ready at http://localhost:${port}/graphql`);
  });
};

bootstrapServer();
