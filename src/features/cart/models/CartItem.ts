import type { Product } from "../../catalog/models/Product";

export interface CartItem {
  product: Product;
  quantity: number;
}
