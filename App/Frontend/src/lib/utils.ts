import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
export const validateStep = (
  pathname: string,
  searchParams: URLSearchParams
): boolean => {
  switch (pathname) {
    case "/dashboard/new/title":
      return !!searchParams.get("title")?.trim();
    case "/dashboard/new/categories":
      return !!searchParams.get("categories")?.trim();
    case "/dashboard/new/description":
      return !!searchParams.get("description")?.trim();
    case "/dashboard/new/price":
      return (
        !!searchParams.get("purchasePrice")?.trim() &&
        !!searchParams.get("rentPrice")?.trim() &&
        !!searchParams.get("rentOption")?.trim()
      );
    case "/dashboard/new/summary":
      return (
        !!searchParams.get("title")?.trim() &&
        !!searchParams.get("categories")?.trim() &&
        !!searchParams.get("description")?.trim() &&
        !!searchParams.get("purchasePrice")?.trim() &&
        !!searchParams.get("rentPrice")?.trim() &&
        !!searchParams.get("rentOption")?.trim()
      );
    default:
      return false;
  }
};
