import ProductCard from "@/components/ProductCard.tsx";
import { Button } from "@/components/ui/button.tsx";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useMyProducts } from "@/features/my-products/hooks/useMyProducts.ts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Product } from "@/types.ts";
import { useDeleteProduct } from "@/features/my-products/hooks/useDeleteProduct"; // import the delete hook

const MyProducts = () => {
  // Get products along with a refetch function.
  const { products, loading, error, refetch } = useMyProducts();
  // Use the delete hook.
  const {
    deleteProduct,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteProduct();

  // Handler to delete a product, then refetch the products list.
  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      // Optionally display a notification here.
      refetch();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col py-6 items-center justify-center">
      <h1 className="text-2xl font-semibold">MY PRODUCTS</h1>
      {/* Wrap the product list in a scrollable container */}
      <ScrollArea className="h-96">
        <div className="space-y-4">
          {products.length === 0 ? (
            <div className="text-center text-gray-500">
              No products found. Add your first product!
            </div>
          ) : (
            products.map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
                // Pass our delete handler to the ProductCard.
                onDelete={handleDeleteProduct}
                isDashboard={true}
              />
            ))
          )}
        </div>
      </ScrollArea>

      <div className="mt-6 flex justify-center">
        <Link to="/dashboard/my-products/new">
          <Button variant="teebay">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Optionally display delete loading/error states */}
      {deleteLoading && (
        <p className="text-center text-sm text-gray-500">Deleting product...</p>
      )}
      {deleteError && (
        <p className="text-center text-sm text-red-500">
          Error deleting product: {deleteError.message}
        </p>
      )}
    </div>
  );
};

export default MyProducts;
