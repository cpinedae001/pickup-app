import CartProvider from "../features/cart/context/CartProvider";
import OrderProvider from "../features/checkout/context/OrderProvider";
import AppRouter from "./router";

export default function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <AppRouter />
      </OrderProvider>
    </CartProvider>
  );
}
