import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import data from "../../../data.json";

export const EditProductPage: React.FC = () => {
  const { toast } = useToast();
  const { productId } = useParams();
  const [product, setProduct] = React.useState<Product>(
    data.find((product) => product.id === productId)
  );
  const navigate = useNavigate();

  const handleChange = (field: keyof Product, value: string) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated product:", product);
    // Add your API call here
    navigate("/dashboard");
    toast({
      title: "Success",
      description: "Product has been updated successfully.",
    });
  };

  // Validation function to check if required fields are filled
  const isFormValid = () => {
    return (
      product.title?.trim() !== "" &&
      product.category?.trim() !== "" &&
      product.description?.trim() !== "" &&
      product.price !== undefined &&
      product.price !== "" &&
      product.rentPrice !== undefined &&
      product.rentPrice !== "" &&
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
              <Label htmlFor="category">Category *</Label>
              <Select
                value={product.category}
                onValueChange={(value) => handleChange("category", value)}
              >
                <SelectTrigger
                  className={!product.category?.trim() ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Furniture">Furniture</SelectItem>
                  <SelectItem value="Home">Home</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Books">Books</SelectItem>
                </SelectContent>
              </Select>
              {!product.category?.trim() && (
                <p className="text-red-500 text-sm">Category is required</p>
              )}
            </div>

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

export default EditProductPage;
