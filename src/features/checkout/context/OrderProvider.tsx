import { useState } from "react";
import type { ReactNode } from "react";

import { OrderContext } from "./OrderContext";
import type { Order } from "../models/Order";

interface OrderProviderProps {
  children: ReactNode;
}

export default function OrderProvider({ children }: OrderProviderProps) {
  const [order, setOrder] = useState<Order | null>(null);

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
