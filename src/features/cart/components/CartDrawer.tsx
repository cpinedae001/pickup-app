import { useNavigate } from "react-router";
import { useCart } from "../hooks/useCart";
import CartItemRow from "./CartItemRow";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, clearCart, storeId } = useCart();
  const navigate = useNavigate();

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const total = subtotal;

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (items.length === 0 || storeId === null) {
      return;
    }

    onClose();
    navigate("/checkout");
  };
  return (
    <div className="fixed inset-0 z-[1000]">
      {/* Fondo oscuro */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      {/* Panel lateral */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Mi carrito"
        className="absolute inset-y-0 right-0 flex w-full flex-col bg-white shadow-xl sm:w-[420px]"
      >
        {/* Encabezado */}
        <header className="flex items-center justify-between bg-teal-600 px-5 py-4 text-white">
          <h2 className="text-lg font-semibold">Mi carrito</h2>

          <div className="flex items-center gap-3">
            {items.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("¿Deseas vaciar todo el carrito?")) {
                    clearCart();
                  }
                }}
                className="text-sm font-medium hover:underline"
              >
                Vaciar carrito
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar carrito"
              className="rounded px-2 py-1 hover:bg-teal-700"
            >
              ✕
            </button>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <p className="py-10 text-center text-gray-500">
              Tu carrito está vacío.
            </p>
          ) : (
            <div>
              {items.map((item) => (
                <CartItemRow key={item.product.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Pie del carrito */}
        <footer className="border-t border-gray-200 bg-white p-5">
          {items.length > 0 && (
            <div className="mb-5 space-y-3">
              <h3 className="font-semibold text-gray-900">
                Resumen del pedido
              </h3>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Productos ({totalItems} unidades)</span>
                <span>Q{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>Q{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between border-t border-gray-200 pt-3">
                <span className="font-semibold text-gray-900">Total</span>

                <span className="text-xl font-bold text-teal-700">
                  Q{total.toFixed(2)}
                </span>
              </div>

              <p className="text-xs text-gray-500">
                Pedido para recoger en tienda. No incluye cargos adicionales.
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={handleCheckout}
            disabled={items.length === 0 || storeId === null}
            className="w-full rounded-lg bg-teal-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Continuar con el pedido
          </button>
        </footer>
      </aside>
    </div>
  );
}
