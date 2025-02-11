import prisma from "@/prisma";

interface CreateCategoryInput {
  name: string;
}

export const categoryService = {
  // Retrieve all categories
  async getAllCategories() {
    return prisma.category.findMany();
  },

  // Retrieve a single category by its ID
  async getCategoryById(id: string) {
    return prisma.category.findUnique({ where: { id } });
  },

  // Create a new category
  async createCategory(input: CreateCategoryInput) {
    return prisma.category.create({
      data: {
        name: input.name,
      },
    });
  },
};
