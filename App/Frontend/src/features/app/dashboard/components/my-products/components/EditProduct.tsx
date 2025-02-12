import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useToast } from "@/hooks/use-toast.ts";
import { Product } from "@/types.ts";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import data from "@/data.json";

// Define category options
const CATEGORY_OPTIONS = [
  "Electronics",
  "Furniture",
  "Home appliances",
  "Sporting goods",
  "Outdoor",
  "Toys",
];

const EditProduct: React.FC = () => {
  const { toast } = useToast();
  const { productId } = useParams();
  const [product, setProduct] = React.useState<Product>(
    data.find((product) => product.id === productId),
  );
  const navigate = useNavigate();

  const handleChange = (field: keyof Product, value: string | string[]) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    const currentCategories = product.categories || [];
    const newCategories = currentCategories.includes(value)
      ? currentCategories.filter((cat) => cat !== value)
      : [...currentCategories, value];

    handleChange("categories", newCategories);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated product:", product);
    // Add your API call here
    navigate("/dashboard/my-products");
    toast({
      title: "Success",
      description: "Product has been updated successfully.",
    });
  };

  // Validation function to check if required fields are filled
  const isFormValid = () => {
    return (
      product.title?.trim() !== "" &&
      product.categories &&
      product.categories.length > 0 &&
      product.description?.trim() !== "" &&
      product.price !== undefined &&
      product.rentPrice !== undefined &&
      product.rentOption?.trim() !== ""
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={product.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className={!product.title?.trim() ? "border-red-500" : ""}
              />
              {!product.title?.trim() && (
                <p className="text-red-500 text-sm">Title is required</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="categories">Categories *</Label>
              <Select onValueChange={handleCategoryChange} value="">
                <SelectTrigger
                  className={
                    !product.categories || product.categories.length === 0
                      ? "border-red-500"
                      : ""
                  }
                >
                  <SelectValue placeholder="Select categories" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {product.categories && product.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.categories.map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="flex items-center"
                    >
                      {category}
                      <button
                        onClick={() => handleCategoryChange(category)}
                        className="ml-2 text-destructive hover:text-destructive/80"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              {(!product.categories || product.categories.length === 0) && (
                <p className="text-red-500 text-sm">
                  At least one category is required
                </p>
              )}
            </div>

            {/* Rest of the form remains the same as in the original code */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={product.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className={`min-h-[200px] ${
                  !product.description?.trim() ? "border-red-500" : ""
                }`}
              />
              {!product.description?.trim() && (
                <p className="text-red-500 text-sm">Description is required</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  value={product.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  className={!product.price ? "border-red-500" : ""}
                />
                {!product.price && (
                  <p className="text-red-500 text-sm">Price is required</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Rent *</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={product.rentPrice}
                    onChange={(e) => handleChange("rentPrice", e.target.value)}
                    className={`w-24 ${
                      !product.rentPrice ? "border-red-500" : ""
                    }`}
                  />
                  <Select
                    value={product.rentOption}
                    onValueChange={(value) => handleChange("rentOption", value)}
                  >
                    <SelectTrigger
                      className={
                        !product.rentOption?.trim() ? "border-red-500" : ""
                      }
                    >
                      <SelectValue placeholder="Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Per Day</SelectItem>
                      <SelectItem value="weekly">Per Week</SelectItem>
                      <SelectItem value="monthly">Per Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {(!product.rentPrice || !product.rentOption?.trim()) && (
                  <p className="text-red-500 text-sm">
                    Rent details are required
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                variant={"teebay"}
                disabled={!isFormValid()}
              >
                Edit Product
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProduct;
