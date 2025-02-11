import { transactionService } from "@/graphql/services/transaction.service";

export const transactionResolver = {
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
