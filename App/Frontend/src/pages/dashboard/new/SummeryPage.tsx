import React from "react";
import { useSearchParams } from "react-router-dom";

export const SummaryPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const formData: Partial<ProductFormData> = {
    title: searchParams.get("title") || "",
    categories: searchParams.get("categories") || "",
    description: searchParams.get("description") || "",
    purchasePrice: searchParams.get("purchasePrice") || "",
    rentPrice: searchParams.get("rentPrice") || "",
    rentOption: searchParams.get("rentOption") || "",
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Summary</h2>
      <div className="space-y-2">
        <p>
          <strong>Title:</strong> {formData.title}
        </p>
        <p>
          <strong>Categories:</strong> {formData.categories}
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
};
