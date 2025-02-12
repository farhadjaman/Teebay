import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types.ts";
import data from "@/data.json";

const TransactionHistory = () => {
  // Example data - replace with your actual data fetching logic
  const products = data as Product[];
  const boughtItems: Product[] = [products[0]];
  const soldItems: Product[] = [];
  const borrowedItems: Product[] = [products[1]];
  const lentItems: Product[] = products;

  const renderProductList = (items: Product[]) => (
    <div className="max-w-3xl mx-auto">
      {items.length > 0 ? (
        items.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))
      ) : (
        <p className="text-center text-muted-foreground py-8">No items found</p>
      )}
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="bought" className="w-full mt-2">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bought">Bought</TabsTrigger>
          <TabsTrigger value="sold">Sold</TabsTrigger>
          <TabsTrigger value="borrowed">Borrowed</TabsTrigger>
          <TabsTrigger value="lent">Lent</TabsTrigger>
        </TabsList>

        <div className="mt-11">
          <TabsContent value="bought">
            {renderProductList(boughtItems)}
          </TabsContent>

          <TabsContent value="sold">{renderProductList(soldItems)}</TabsContent>

          <TabsContent value="borrowed">
            {renderProductList(borrowedItems)}
          </TabsContent>

          <TabsContent value="lent">{renderProductList(lentItems)}</TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TransactionHistory;
