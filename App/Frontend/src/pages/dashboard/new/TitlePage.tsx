import { Input } from "@/components/ui/input";
import React from "react";
import { useSearchParams } from "react-router-dom";

export const TitlePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get("title") || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("title", e.target.value);
    setSearchParams(newParams);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Select a title for your product</h2>
      <Input
        value={title}
        onChange={handleChange}
        placeholder="Enter product title"
        className="w-full"
      />
    </div>
  );
};
