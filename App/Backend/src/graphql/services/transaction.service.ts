import prisma from "@/prisma";
import { TransactionType } from "@prisma/client";

interface TransactionInput {
  type: TransactionType;
  productId: string;
}

export const transactionService = {
  // Create a new transaction
  async createTransaction(input: TransactionInput, userId: string) {
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Verify that the product exists
    const product = await prisma.product.findUnique({
      where: { id: input.productId },
    });
    if (!product) {
      throw new Error("Product not found");
    }

    return prisma.transaction.create({
      data: {
        type: input.type,
        productId: input.productId,
        userId,
      },
    });
  },

  async getTransactionProduct(transactionId: string) {
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
    });
    if (!transaction) throw new Error("Transaction not found");

    return prisma.product.findUnique({ where: { id: transaction.productId } });
  },

  async getTransactionUser(transactionId: string) {
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
    });
    if (!transaction) throw new Error("Transaction not found");

    return prisma.user.findUnique({ where: { id: transaction.userId } });
  },
};
