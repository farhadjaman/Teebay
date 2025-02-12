import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Type definitions
type FormStep = "title" | "categories" | "description" | "price" | "summary";
type ProductFormData = {
  title: string;
  categories: string[];
  description: string;
  purchasePrice: string;
  rentPrice: string;
  rentOption: string;
};

const CATEGORIES = [
  "Electronics",
  "Furniture",
  "Home appliances",
  "Sporting goods",
  "Outdoor",
  "Toys",
];

const RENT_OPTIONS = [
  { value: "daily", label: "Per Day" },
  { value: "weekly", label: "Per Week" },
  { value: "monthly", label: "Per Month" },
];

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

  const updateFormData = (key: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

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
    const steps: FormStep[] = [
      "title",
      "categories",
      "description",
      "price",
      "summary",
    ];
    const currentIndex = steps.indexOf(currentStep);

    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: FormStep[] = [
      "title",
      "categories",
      "description",
      "price",
      "summary",
    ];
    const currentIndex = steps.indexOf(currentStep);

    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleSubmit = () => {
    navigate("/dashboard/my-products");
    console.log("Final form data:", formData);
    // Handle form submission here
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => {
      const currentCategories = prev.categories;
      const newCategories = currentCategories.includes(value)
        ? currentCategories.filter((c) => c !== value)
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
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Select Categories</h2>
            <Select onValueChange={handleCategoryChange} value="">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select categories" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.categories.map((category) => (
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
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Summary</h2>
            <div className="space-y-2">
              <p>
                <strong>Title:</strong> {formData.title}
              </p>
              <p>
                <strong>Categories:</strong> {formData.categories.join(", ")}
              </p>
              <p>
                <strong>Description:</strong> {formData.description}
              </p>
              <p>
                <strong>Purchase Price:</strong> ${formData.purchasePrice}
              </p>
              <p>
                <strong>Rent Price:</strong> ${formData.rentPrice}{" "}
                {formData.rentOption}
              </p>
            </div>
          </div>
        );
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
                  disabled={!isCurrentStepValid()}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  variant="teebay"
                  onClick={handleNext}
                  disabled={!isCurrentStepValid()}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProduct;
