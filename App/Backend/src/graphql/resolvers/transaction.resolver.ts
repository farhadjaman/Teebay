import { transactionService } from "@/graphql/services/transaction.service";

export const transactionResolver = {
  Query: {
    async myTransactions(_: any, __: any, context: any) {
      try {
        console.log("context.userId", context.userId);
        if (!context.userId) {
          throw new Error("Not authenticated");
        }
        return await transactionService.getMyTransactions(context.userId) || [];
      } catch (error: any) {
        throw new Error("Error fetching my transactions: " + error.message);
      }
    },
    async myProductTransactions(_: any, __: any, context: any) {
      try {
        console.log("context.userId", context.userId);
        if (!context.userId) {
          throw new Error("Not authenticated");
        }

        return await transactionService.getMyProductTransactions(context.userId) || [];
      } catch (error: any) {
        throw new Error("Error fetching my product transactions: " + error.message);
      }
    },
  },
  Mutation: {
    async createTransaction(_: any, { input }: any, context: any) {
      return transactionService.createTransaction(input, context.userId);
    },
  },
  Transaction: {
    async product(parent: any) {
      return transactionService.getTransactionProduct(parent.id);
    },
    async user(parent: any) {
      return transactionService.getTransactionUser(parent.id);
    },
  },
};
