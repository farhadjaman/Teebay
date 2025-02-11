
type Category = "Electronics"|
    "Furniture"|
    "Home appliances"|
    "Sporting goods"|
    "Outdoor"|
    "Toys"|
    "Home";
export interface Product {
  id: string;
  title: string;
  categories: Category[ ];
  price: number;
  description: string;
  datePosted: string;
  views: number;
  rentPrice: number;
  rentOption: "daily" | "weekly" | "monthly";
}
