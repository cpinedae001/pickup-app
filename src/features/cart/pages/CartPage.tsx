import { useCart } from "../hooks/useCart";

export default function CartPage() {
  const { items } = useCart();

  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        Carrito de compras
      </h1>

      {items.length === 0 ? (
        <p className="rounded-lg bg-gray-50 p-6 text-gray-600">
          Tu carrito está vacío.
        </p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={item.product.id}
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4"
            >
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="h-20 w-20 object-contain"
              />

              <div>
                <h2 className="font-semibold text-gray-900">
                  {item.product.name}
                </h2>

                <p className="text-sm text-gray-600">
                  Cantidad: {item.quantity}
                </p>

                <p className="font-semibold text-teal-700">
                  Q{item.product.price.toFixed(2)}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
