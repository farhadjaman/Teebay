import ProductList from "@/components/ProductList";
import { FC } from "react";

const ProductsPage: FC = () => {
  return (
    <div className="h-[85vh] flex items-center justify-center">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-center mb-8">ALL PRODUCTS</h1>
        <ProductList />
      </div>
    </div>
  );
};

export default ProductsPage;
