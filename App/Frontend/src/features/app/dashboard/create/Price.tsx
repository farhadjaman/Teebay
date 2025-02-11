import { Input } from "@/components/ui/input.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import React from "react";
import { useSearchParams } from "react-router-dom";

export const Price: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const purchasePrice = searchParams.get("purchasePrice") || "";
  const rentPrice = searchParams.get("rentPrice") || "";
  const rentOption = searchParams.get("rentOption") || "";

  const updateSearchParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Select price</h2>
      <Input
        type="number"
        value={purchasePrice}
        onChange={(e) => updateSearchParams("purchasePrice", e.target.value)}
        placeholder="Purchase price"
        className="w-full"
      />
      <div className="flex gap-2">
        <Input
          type="number"
          value={rentPrice}
          onChange={(e) => updateSearchParams("rentPrice", e.target.value)}
          placeholder="Rent price"
          className="w-32"
        />
        <Select
          value={rentOption}
          onValueChange={(value) => updateSearchParams("rentOption", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Per Day</SelectItem>
            <SelectItem value="weekly">Per Week</SelectItem>
            <SelectItem value="monthly">Per Month</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
