import prisma from "@/prisma";

interface ProductInput {
  title: string;
  description: string;
  price: number;
  rentPrice?: number;
  rentOption?: string;
  categoryIds?: string[];
}

export const productService = {
  // Get all productsa
  async getAllProducts() {
    return prisma.product.findMany();
  },
  // Get a single product by its id
  async getProductById(id: string) {
    return prisma.product.findUnique({ where: { id } });
  },
  async getProductsByUser(userId: string) {
    return prisma.product.findMany({
      where: { ownerId: userId },
    });
  },
  // Create a new product
  async createProduct(input: ProductInput, userId: string) {
    if (!userId) {
      throw new Error("Not authenticated");
    }
    return prisma.product.create({
      data: {
        title: input.title,
        description: input.description,
        price: input.price,
        rentPrice: input.rentPrice,
        rentOption: input.rentOption,
        ownerId: userId,
        categories: {
          connect: input.categoryIds?.map((catId: string) => ({ id: catId })),
        },
      },
    });
  },
  // Update an existing product
  async updateProduct(id: string, input: ProductInput, userId: string) {
    if (!userId) {
      throw new Error("Not authenticated");
    }
    // Check if product exists and if the user is the owner
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) throw new Error("Product not found");
    if (existing.ownerId !== userId) {
      throw new Error("You are not the owner of this product");
    }

    return prisma.product.update({
      where: { id },
      data: {
        title: input.title,
        description: input.description,
        price: input.price,
        rentPrice: input.rentPrice,
        rentOption: input.rentOption,
      },
    });
  },
  // Delete a product
  async deleteProduct(id: string, userId: string) {
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) throw new Error("Product not found");
    if (existing.ownerId !== userId) {
      throw new Error("You are not the owner of this product");
    }

    await prisma.product.delete({ where: { id } });
    return true;
  },
  // Relationship resolvers
  async getProductOwner(ownerId: string) {
    return prisma.user.findUnique({ where: { id: ownerId } });
  },
  async getProductCategories(productId: string) {
    return prisma.category.findMany({
      where: { products: { some: { id: productId } } },
    });
  },
};
