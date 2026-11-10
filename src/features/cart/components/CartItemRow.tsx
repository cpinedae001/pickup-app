import type { CartItem } from "../models/CartItem";
import { useCart } from "../hooks/useCart";

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { storeId, addItem, decrementItem, removeItem } = useCart();
  return (
    <article className="flex gap-3 border-b border-gray-200 py-4">
      <img
        src={item.product.imageUrl}
        alt={item.product.name}
        className="h-20 w-20 shrink-0 object-contain"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-gray-900">
            {item.product.name}
          </h3>

          <button
            type="button"
            onClick={() => removeItem(item.product.id)}
            aria-label={`Eliminar ${item.product.name}`}
            title="Eliminar producto"
            className="rounded-md p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
          >
            🗑
          </button>
        </div>

        <p className="mt-1 text-xs text-gray-500">{item.product.description}</p>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center rounded-lg border border-gray-300">
            <button
              type="button"
              onClick={() => decrementItem(item.product.id)}
              aria-label={`Disminuir ${item.product.name}`}
              className="px-3 py-2 text-teal-700 hover:bg-gray-100"
            >
              −
            </button>

            <span className="min-w-8 text-center font-semibold">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() => {
                if (storeId !== null) {
                  addItem(item.product, storeId);
                }
              }}
              aria-label={`Aumentar ${item.product.name}`}
              className="px-3 py-2 text-teal-700 hover:bg-gray-100"
            >
              +
            </button>
          </div>

          <span className="text-sm font-semibold text-teal-700">
            Q{(item.product.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </article>
  );
}
