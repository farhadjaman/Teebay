import { productService } from "@/graphql/services/product.service";

export const productResolver = {
  Query: {
    async allProducts() {
      return productService.getAllProducts();
    },
    async productById(_: any, { id }: { id: string }) {
      return productService.getProductById(id);
    },
    async myProducts(_: any, __: any, context: any) {
      return productService.getProductsByUser(context.userId);
    },
  },
  Mutation: {
    async createProduct(_: any, { input }: any, context: any) {
      return productService.createProduct(input, context.userId);
    },
    async updateProduct(_: any, { id, input }: any, context: any) {
      return productService.updateProduct(id, input, context.userId);
    },
    async deleteProduct(_: any, { id }: { id: string }, context: any) {
      return productService.deleteProduct(id, context.userId);
    },
  },
  // Relationship resolvers can also delegate to the service
  Product: {
    async owner(parent: any) {
      return productService.getProductOwner(parent.ownerId);
    },
    async categories(parent: any) {
      return productService.getProductCategories(parent.id);
    },
    async transactions(parent: any) {
      return productService.getProductTransactions(parent.id);
    },
  },
};
