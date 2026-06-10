export type Category = "all" | "coffee" | "food" | "drink" | "dessert";

export type Language = "tr" | "en";

export interface RecipeItem {
  ingredientId: string;
  amount: number;
  unit: string;
}

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  category: Exclude<Category, "all">;
  imageUrl: string;
  isActive: boolean;
  stock: number;
  recipe: RecipeItem[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  itemNote?: string;
}

export interface Cart {
  items: CartItem[];
  orderNote: string;
}

export type OrderStatus = "pending" | "preparing" | "ready" | "paid";

export interface Order {
  orderNumber: string;
  tableNumber: number | null;
  items: CartItem[];
  orderNote: string;
  total: number;
  status: OrderStatus;
  createdAt: number;
}
