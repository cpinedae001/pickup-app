import { Routes, Route } from "react-router";

import StorePage from "../features/stores/pages/StorePage";
import CatalogPage from "../features/catalog/pages/CatalogPage";
import CartPage from "../features/cart/pages/CartPage";
import CheckoutPage from "../features/checkout/pages/CheckoutPage";
import ConfirmationPage from "../features/checkout/pages/ConfirmationPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<StorePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/confirmation" element={<ConfirmationPage />} />
    </Routes>
  );
}
