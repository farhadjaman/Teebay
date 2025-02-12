import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Custom hooks for fetching categories and creating a product
import { useCategories } from "@/features/my-products/hooks/useCategories";
import { useCreateProduct } from "@/features/my-products/hooks/useCreateProduct";

// Import types from your types file
import { Category, ProductInput } from "@/types";

// Define the form data type to store only the category IDs
type ProductFormData = {
  title: string;
  categories: string[]; // storing only category IDs
  description: string;
  purchasePrice: string;
  rentPrice: string;
  rentOption: string;
};

// Rent options (can be static)
const RENT_OPTIONS = [
  { value: "daily", label: "Per Day" },
  { value: "weekly", label: "Per Week" },
  { value: "monthly", label: "Per Month" },
];

type FormStep = "title" | "categories" | "description" | "price" | "summary";

const CreateProduct: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<FormStep>("title");
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    categories: [],
    description: "",
    purchasePrice: "",
    rentPrice: "",
    rentOption: "",
  });

  // Fetch categories from the backend via GraphQL.
  // Each category has an id and name.
  const {
    categories, // an array of Category objects
    loading: loadingCategories,
    error: categoriesError,
  } = useCategories();

  // Mutation hook for creating a product.
  // The mutation expects an input of type ProductInput, which includes a field categoryIds: [String!]
  const { createProduct, loading: creating, error: createError } = useCreateProduct();

  // Helper to update form data.
  const updateFormData = (key: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Validate the current step.
  const isCurrentStepValid = (): boolean => {
    switch (currentStep) {
      case "title":
        return formData.title.trim() !== "";
      case "categories":
        return formData.categories.length > 0;
      case "description":
        return formData.description.trim() !== "";
      case "price":
        return (
            formData.purchasePrice.trim() !== "" &&
            formData.rentPrice.trim() !== "" &&
            formData.rentOption.trim() !== ""
        );
      default:
        return true;
    }
  };

  const handleNext = () => {
    const steps: FormStep[] = ["title", "categories", "description", "price", "summary"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: FormStep[] = ["title", "categories", "description", "price", "summary"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  // When submitting, construct an input of type ProductInput.
  // Note: price and rentPrice are converted to numbers.
  // The backend expects the field `categoryIds` (an array of strings).
  const handleSubmit = async () => {
    const input: ProductInput = {
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.purchasePrice),
      rentPrice: parseFloat(formData.rentPrice),
      rentOption: formData.rentOption,
      categoryIds: formData.categories, // sending an array of category IDs
    };

    try {
      await createProduct(input);
      navigate("/dashboard/my-products");
    } catch (err) {
      console.error("Error creating product:", err);
    }
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => {
      const currentCategories = prev.categories;
      const newCategories = currentCategories.includes(value)
          ? currentCategories.filter((catId) => catId !== value)
          : [...currentCategories, value];
      return { ...prev, categories: newCategories };
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case "title":
        return (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Enter Product Title</h2>
              <Input
                  value={formData.title}
                  onChange={(e) => updateFormData("title", e.target.value)}
                  placeholder="Enter product title"
                  className="w-full"
              />
            </div>
        );

      case "categories":
        if (loadingCategories) {
          return <p>Loading categories...</p>;
        }
        if (categoriesError) {
          return <p>Error loading categories: {categoriesError.message}</p>;
        }
        return (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Select Categories</h2>
              <Select onValueChange={handleCategoryChange} value="">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category: Category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.categories.map((catId) => {
                      const cat = categories.find((c: Category) => c.id === catId);
                      return (
                          <Badge key={catId} variant="secondary" className="flex items-center">
                            {cat ? cat.name : catId}
                            <button
                                onClick={() => handleCategoryChange(catId)}
                                className="ml-2 text-destructive hover:text-destructive/80"
                            >
                              ×
                            </button>
                          </Badge>
                      );
                    })}
                  </div>
              )}
            </div>
        );

      case "description":
        return (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Product Description</h2>
              <Textarea
                  value={formData.description}
                  onChange={(e) => updateFormData("description", e.target.value)}
                  placeholder="Enter product description"
                  className="w-full"
              />
            </div>
        );

      case "price":
        return (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Pricing Details</h2>
              <Input
                  type="number"
                  value={formData.purchasePrice}
                  onChange={(e) => updateFormData("purchasePrice", e.target.value)}
                  placeholder="Purchase price"
                  className="w-full mb-2"
              />
              <div className="flex gap-2">
                <Input
                    type="number"
                    value={formData.rentPrice}
                    onChange={(e) => updateFormData("rentPrice", e.target.value)}
                    placeholder="Rent price"
                    className="w-32"
                />
                <Select
                    value={formData.rentOption}
                    onValueChange={(value) => updateFormData("rentOption", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    {RENT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
        );

      case "summary":
        { const selectedCategoryNames = categories
            .filter((c: Category) => formData.categories.includes(c.id))
            .map((c: Category) => c.name)
            .join(", ");
        return (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Summary</h2>
              <div className="space-y-2">
                <p>
                  <strong>Title:</strong> {formData.title}
                </p>
                <p>
                  <strong>Categories:</strong> {selectedCategoryNames}
                </p>
                <p>
                  <strong>Description:</strong> {formData.description}
                </p>
                <p>
                  <strong>Purchase Price:</strong> ${formData.purchasePrice}
                </p>
                <p>
                  <strong>Rent Price:</strong> ${formData.rentPrice} {formData.rentOption}
                </p>
              </div>
            </div>
        );
        }

      default:
        return null;
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            {renderStep()}
            <div className="flex justify-between mt-6">
              {currentStep !== "title" && (
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
              )}
              <div className="ml-auto">
                {currentStep === "summary" ? (
                    <Button
                        variant="teebay"
                        onClick={handleSubmit}
                        disabled={!isCurrentStepValid() || creating}
                    >
                      {creating ? "Submitting..." : "Submit"}
                    </Button>
                ) : (
                    <Button variant="teebay" onClick={handleNext} disabled={!isCurrentStepValid()}>
                      Next
                    </Button>
                )}
              </div>
            </div>
            {createError && (
                <p className="mt-2 text-center text-sm text-red-500">
                  Error: {createError.message}
                </p>
            )}
          </CardContent>
        </Card>
      </div>
  );
};

export default CreateProduct;
