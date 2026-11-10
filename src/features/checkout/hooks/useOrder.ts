import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

export function useOrder() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useOrder debe utilizarse dentro de OrderProvider");
  }

  return context;
}
