import type { CartItem } from "../../cart/models/CartItem";

export interface Order {
  id: string;
  storeId: number;
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  items: CartItem[];
  total: number;
  createdAt: string;
  estimatedMinutes: number;
}
