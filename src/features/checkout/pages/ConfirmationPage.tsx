import { Link } from "react-router";
import { useOrder } from "../hooks/useOrder";
import { stores } from "../../stores/data/stores";

export default function ConfirmationPage() {
  const { order, setOrder } = useOrder();

  if (!order) {
    return (
      <main className="mx-auto max-w-xl px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          No hay un pedido confirmado
        </h1>

        <p className="mt-3 text-gray-600">
          Selecciona una tienda y realiza un pedido para continuar.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700"
        >
          Seleccionar tienda
        </Link>
      </main>
    );
  }

  const store = stores.find((item) => item.id === order.storeId);

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="text-center">
          <div
            aria-hidden="true"
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700"
          >
            ✓
          </div>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            ¡Pedido confirmado!
          </h1>

          <p className="mt-2 text-gray-600">
            Tu pedido Pickup se registró correctamente.
          </p>
        </div>

        <div className="mt-8 rounded-lg bg-teal-50 p-5 text-center">
          <p className="text-sm text-gray-600">Número de pedido</p>

          <p className="mt-1 text-2xl font-bold text-teal-700">{order.id}</p>

          <p className="mt-3 text-sm font-medium text-gray-700">
            Tiempo estimado de preparación: {order.estimatedMinutes} minutos
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Información de recogida
          </h2>

          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-600">Tienda: </span>
              <span className="font-medium">
                {store?.name ?? "Tienda no disponible"}
              </span>
            </p>

            {store && (
              <p>
                <span className="text-gray-600">Dirección: </span>
                {store.address}
              </p>
            )}

            <p>
              <span className="text-gray-600">Cliente: </span>
              {order.customer.name}
            </p>

            <p>
              <span className="text-gray-600">Teléfono: </span>
              {order.customer.phone}
            </p>

            {order.customer.email && (
              <p>
                <span className="text-gray-600">Correo: </span>
                {order.customer.email}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Resumen del pedido
          </h2>

          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between gap-4 text-sm"
              >
                <span className="text-gray-600">
                  {item.product.name} × {item.quantity}
                </span>

                <span className="font-medium text-gray-900">
                  Q{(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-between border-t border-gray-200 pt-4">
            <span className="font-semibold text-gray-900">Total</span>

            <span className="text-xl font-bold text-teal-700">
              Q{order.total.toFixed(2)}
            </span>
          </div>
        </div>

        <p className="mt-6 rounded-lg bg-gray-50 p-4 text-center text-sm text-gray-600">
          Presenta tu número de pedido al momento de recoger tu compra.
        </p>

        <Link
          to="/"
          onClick={() => setOrder(null)}
          className="mt-6 block rounded-lg bg-teal-600 px-5 py-3 text-center font-semibold text-white hover:bg-teal-700"
        >
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}
