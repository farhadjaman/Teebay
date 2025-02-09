import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useSearchParams } from "react-router-dom";

export const DescriptionPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const description = searchParams.get("description") || "";

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Select description</h2>
      <Textarea
        value={description}
        onChange={(e) => {
          const newParams = new URLSearchParams(searchParams);
          newParams.set("description", e.target.value);
          setSearchParams(newParams);
        }}
        placeholder="Enter product description"
        className="w-full"
      />
    </div>
  );
};
