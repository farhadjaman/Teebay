export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  datePosted: string;
  views: number;
  rentPrice: number;
  rentOption: "daily" | "weekly" | "monthly";
}
