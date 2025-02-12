export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  rentPrice: number;
  rentOption: string;
  createdAt: string;
  views: number;
  categories: Category[];
}

export interface ProductInput {
  title: string;
  description: string;
  price: number;
  rentPrice: number;
  rentOption: string;
  categoryIds: string[];
}
