import { useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import ConfirmationModal from "@/components/ConfirmationModal";

import { useProduct } from "@/features/products/hooks/useProduct";
import { useCreateTransaction } from "@/features/products/hooks/useCreateTransaction.ts";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [showBuyModal, setShowBuyModal] = useState<boolean>(false);
  const { product, loading, error, refetch } = useProduct(productId || "");
  const { createTransaction } = useCreateTransaction();

  if (!productId) {
    return <Navigate to="/404" replace />;
  }

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error || !product) {
    return <Navigate to="/404" replace />;
  }

  const {
    title,
    categories,
    price,
    rentPrice,
    rentOption,
    description,
    transactions = [],
  } = product;

  const boughtCount = transactions.filter(
    (t: { type: string }) => t.type === "BUY",
  ).length;
  const rentCount = transactions.filter(
    (t: { type: string }) => t.type === "RENT",
  ).length;

  const handleBuyConfirm = async () => {
    try {
      await createTransaction(product.id, "BUY");
      setShowBuyModal(false);
      refetch();
    } catch (err) {
      console.error("Error processing buy transaction:", err);
    }
  };

  const handleRent = async () => {
    try {
      const transaction = await createTransaction(product.id, "RENT");
      console.log("Rent transaction completed:", transaction);
      refetch();
    } catch (err) {
      console.error("Error processing rent transaction:", err);
    }
  };

  return (
    <div className="h-[85vh] flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{title}</CardTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map((category: { id: string; name: string }) => (
                  <Badge key={category.id} variant="secondary">
                    {category.name}
                  </Badge>
                ))}
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Price: ${price} | Rent: ${rentPrice} {rentOption}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">Bought: {boughtCount}</div>
              <div className="text-sm font-medium">Rented: {rentCount}</div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
          <div className="space-x-4">
            <Button variant="teebay" onClick={handleRent}>
              Rent
            </Button>
            <Button variant="teebay" onClick={() => setShowBuyModal(true)}>
              Buy
            </Button>
          </div>
        </CardFooter>
      </Card>

      <ConfirmationModal
        isOpen={showBuyModal}
        onClose={() => setShowBuyModal(false)}
        onConfirm={handleBuyConfirm}
        title="Are you sure you want to buy this product?"
        description="This action cannot be undone. Please confirm your purchase."
      />
    </div>
  );
};

export default ProductDetails;
