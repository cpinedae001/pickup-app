import { createContext } from "react";
import type { Order } from "../models/Order";

export interface OrderContextValue {
  order: Order | null;
  setOrder: (order: Order | null) => void;
}

export const OrderContext = createContext<OrderContextValue | undefined>(
  undefined,
);
