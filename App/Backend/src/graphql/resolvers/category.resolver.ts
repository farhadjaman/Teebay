import { categoryService } from "@/graphql/services/category.service";

export const categoryResolver = {
  Query: {
    async allCategories() {
      return categoryService.getAllCategories();
    },
    async categoryById(_: any, { id }: { id: string }) {
      return categoryService.getCategoryById(id);
    },
  },
  Mutation: {
    async createCategory(_: any, { input }: { input: any }) {
      // Optionally, add authentication or authorization checks here.
      return categoryService.createCategory(input);
    },
  },
};
