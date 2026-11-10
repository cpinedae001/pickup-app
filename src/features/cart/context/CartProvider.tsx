import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { CartContext } from "./CartContext";
import type { CartItem } from "../models/CartItem";
import type { Product } from "../../catalog/models/Product";

interface CartProviderProps {
  children: ReactNode;
}

export default function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const savedItems = localStorage.getItem("pickup-cart-items");
      return savedItems ? JSON.parse(savedItems) : [];
    } catch {
      return [];
    }
  });

  const [storeId, setStoreId] = useState<number | null>(() => {
    try {
      const savedStoreId = localStorage.getItem("pickup-cart-store");
      return savedStoreId ? Number(savedStoreId) : null;
    } catch {
      return null;
    }
  });
  useEffect(() => {
    localStorage.setItem("pickup-cart-items", JSON.stringify(items));

    if (storeId !== null) {
      localStorage.setItem("pickup-cart-store", String(storeId));
    } else {
      localStorage.removeItem("pickup-cart-store");
    }
  }, [items, storeId]);

  const addItem = (product: Product, selectedStoreId: number) => {
    if (!product.storeIds.includes(selectedStoreId)) {
      return;
    }

    if (storeId !== null && storeId !== selectedStoreId) {
      return;
    }

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...currentItems, { product, quantity: 1 }];
    });
    setStoreId(selectedStoreId);
  };

  const decrementItem = (productId: number) => {
    const updatedItems = items
      .map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      )
      .filter((item) => item.quantity > 0);

    setItems(updatedItems);

    if (updatedItems.length === 0) {
      setStoreId(null);
    }
  };

  const removeItem = (productId: number) => {
    const updatedItems = items.filter((item) => item.product.id !== productId);

    setItems(updatedItems);

    if (updatedItems.length === 0) {
      setStoreId(null);
    }
  };

  const clearCart = () => {
    setItems([]);
    setStoreId(null);
  };

  return (
    <CartContext.Provider
      value={{ items, storeId, addItem, decrementItem, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
