import { GraphQLResolveInfo } from "graphql";
import { authService } from "@/graphql/services/auth.service";

export const authResolver = {
  Query: {
    async me(_: any, __: any, context: any, info: GraphQLResolveInfo) {
      if (!context.userId) {
        throw new Error("Not authenticated");
      }
      return await authService.getCurrentUser(context.userId, info);
    },
  },

  Mutation: {
    async register(_: any, { input }: { input: any }) {
      return await authService.register(input);
    },

    async login(_: any, { input }: { input: any }, context: any) {
      console.log(`Login attempt from IP: ${context.ip}`);
      return await authService.login(input);
    },
  },
};
