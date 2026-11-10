import { createContext } from "react";
import type { Product } from "../../catalog/models/Product";
import type { CartItem } from "../models/CartItem";

export interface CartContexValue {
  items: CartItem[];
  storeId: number | null;
  addItem: (product: Product, storeId: number) => void;
  decrementItem: (productId: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContexValue | undefined>(
  undefined,
);
