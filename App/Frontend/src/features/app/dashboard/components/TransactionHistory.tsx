import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs.tsx";
import ProductCard from "@/components/ProductCard.tsx";

import { useMyTransactions } from "@/features/app/dashboard/hooks/useMyTransactions";
import { useMyProductTransactions } from "@/features/app/dashboard/hooks/useMyProductTransactions";

const TransactionHistory = () => {
  const {
    transactions: myTransactions,
    loading: loadingMy,
    error: errorMy,
  } = useMyTransactions();

  const {
    transactions: productTransactions,
    loading: loadingProduct,
    error: errorProduct,
  } = useMyProductTransactions();

  // Show loading/error states if needed
  if (loadingMy || loadingProduct) {
    return <div>Loading transactions...</div>;
  }
  if (errorMy || errorProduct) {
    return <div>Error loading transactions.</div>;
  }

  // Filter transactions and extract the associated product for each category.
  const boughtItems = myTransactions
    .filter((t: any) => t.type === "BUY")
    .map((t: any) => t.product);
  const borrowedItems = myTransactions
    .filter((t: any) => t.type === "RENT")
    .map((t: any) => t.product);
  const soldItems = productTransactions
    .filter((t: any) => t.type === "BUY")
    .map((t: any) => t.product);
  const lentItems = productTransactions
    .filter((t: any) => t.type === "RENT")
    .map((t: any) => t.product);

  // Helper function to render a list of products using the ProductCard component.
  const renderProductList = (items: any[]) => (
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
