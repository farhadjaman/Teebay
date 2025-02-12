import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/features/products/hooks/useProducts";
import { Product } from "@/types.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

export default function ProductList() {
  const { products, loading, error } = useProducts();

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;

  return (
      <div className="h-full flex items-center justify-center">
        <div className="max-w-3xl mx-auto py-8 px-4">
          <ScrollArea className="h-96">
            <div className="space-y-4">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
            </div>
          </ScrollArea>

    </div>
      </div>
  );
}
