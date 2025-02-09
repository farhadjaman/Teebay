import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useSearchParams } from "react-router-dom";

export const CategoriesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = searchParams.get("categories") || "";

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Select categories</h2>
      <Select
        value={categories}
        onValueChange={(value) => {
          const newParams = new URLSearchParams(searchParams);
          newParams.set("categories", value);
          setSearchParams(newParams);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="electronics">Electronics</SelectItem>
          <SelectItem value="furniture">Furniture</SelectItem>
          <SelectItem value="home appliances">Home appliances</SelectItem>
          <SelectItem value="sporting goods">Sporting goods</SelectItem>
            <SelectItem value="outdoor">Outdoor</SelectItem>
          <SelectItem value="toys">Toys</SelectItem>

        </SelectContent>
      </Select>
    </div>
  );
};
