import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import { useProduct } from "@/features/products/hooks/useProduct";
import { useUpdateProduct } from "@/features/my-products/hooks/useUpdateProduct";
import { useCategories } from "@/features/my-products/hooks/useCategories";

interface FormValues {
  title: string;
  description: string;
  price: number;
  rentPrice: number;
  rentOption: string;
  categories: string[];
}

const EditProduct: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { product: initialProduct, loading: fetchLoading } = useProduct(
    productId || "",
  );
  const { updateProduct, loading: updateLoading } = useUpdateProduct();
  const { categories, loading: categoriesLoading } = useCategories();

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      rentPrice: 0,
      rentOption: "",
      categories: [],
    },
  });

  useEffect(() => {
    if (initialProduct) {
      reset({
        title: initialProduct.title,
        description: initialProduct.description,
        price: initialProduct.price,
        rentPrice: initialProduct.rentPrice,
        rentOption: initialProduct.rentOption,
        categories: initialProduct.categories.map(
          (category: { id: string; name: string }) => category.name,
        ),
      });
    }
  }, [initialProduct, reset]);

  if (fetchLoading || categoriesLoading || !initialProduct) {
    return (
      <div className="h-[91vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const onSubmit = async (data: FormValues) => {
    try {
      const input = {
        title: data.title,
        description: data.description,
        price: Number(data.price),
        rentPrice: Number(data.rentPrice),
        rentOption: data.rentOption,
        // Map the category names to their ids using the initialProduct.categories
        categoryIds: data.categories
          .map(
            (cat) =>
              initialProduct.categories.find(
                (c: { id: string; name: string }) => c.name === cat,
              )?.id,
          )
          .filter(Boolean),
      };

      if (!productId) {
        throw new Error("Product id was not found");
      }

      await updateProduct(productId, input);

      toast({
        title: "Success",
        description: "Product has been updated successfully.",
      });
      navigate("/dashboard/my-products");
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to update product. Please try again. ${error.message}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title Field */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                {...register("title", { required: "Title is required" })}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Categories Field */}
            <div className="space-y-2">
              <Label htmlFor="categories">Categories *</Label>
              <Controller
                control={control}
                name="categories"
                rules={{
                  validate: (value) =>
                    (value && value.length > 0) ||
                    "At least one category is required",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Select
                      onValueChange={(val) => {
                        const newCategories = value.includes(val)
                          ? value.filter((v: string) => v !== val)
                          : [...value, val];
                        onChange(newCategories);
                      }}
                      value="" // always empty so that the placeholder is visible
                    >
                      <SelectTrigger
                        className={
                          !value || value.length === 0 ? "border-red-500" : ""
                        }
                      >
                        <SelectValue placeholder="Select categories" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(
                          (category: { id: string; name: string }) => (
                            <SelectItem key={category.id} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {value.map((category: string) => (
                        <Badge
                          key={category}
                          variant="secondary"
                          className="flex items-center"
                        >
                          {category}
                          <button
                            type="button"
                            onClick={() =>
                              onChange(
                                value.filter((v: string) => v !== category),
                              )
                            }
                            className="ml-2 text-destructive hover:text-destructive/80"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </>
                )}
              />
              {errors.categories && (
                <p className="text-red-500 text-sm">
                  {errors.categories.message as string}
                </p>
              )}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                className={`min-h-[200px] ${
                  errors.description ? "border-red-500" : ""
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Price and Rent Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 1, message: "Price must be greater than 0" },
                  })}
                  className={errors.price ? "border-red-500" : ""}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Rent *</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    {...register("rentPrice", {
                      required: "Rent price is required",
                      min: {
                        value: 1,
                        message: "Rent price must be greater than 0",
                      },
                    })}
                    className={`w-24 ${
                      errors.rentPrice ? "border-red-500" : ""
                    }`}
                  />
                  <Controller
                    control={control}
                    name="rentOption"
                    rules={{ required: "Rent option is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          className={
                            !field.value || field.value === ""
                              ? "border-red-500"
                              : ""
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
                    )}
                  />
                </div>
                {errors.rentPrice && (
                  <p className="text-red-500 text-sm">
                    {errors.rentPrice.message}
                  </p>
                )}
                {errors.rentOption && (
                  <p className="text-red-500 text-sm">
                    {errors.rentOption.message}
                  </p>
                )}
              </div>
            </div>

            {/* Form Buttons */}
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="teebay" disabled={updateLoading}>
                {updateLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Product"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProduct;
