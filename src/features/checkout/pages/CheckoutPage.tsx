import { Link } from "react-router";
import { useCart } from "../../cart/hooks/useCart";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useOrder } from "../hooks/useOrder";
import { createOrderId } from "../utils/createOrderId";

export default function CheckoutPage() {
  const { items, storeId, clearCart } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const navigate = useNavigate();
  const { setOrder } = useOrder();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const handleConfirmOrder = () => {
    if (!canConfirm || storeId === null) {
      return;
    }

    setOrder({
      id: createOrderId(),
      storeId,
      customer: {
        name: customerName.trim(),
        phone: customerPhone.replace(/[\s-]/g, ""),
        email: customerEmail.trim() || undefined,
      },
      items: items.map((item) => ({ ...item })),
      total,
      createdAt: new Date().toISOString(),
      estimatedMinutes: 30,
    });
    clearCart();
    navigate("/confirmation", { replace: true });
  };

  const isNameValid = customerName.trim().length >= 3;

  const isPhoneValid = /^\d{8}$/.test(customerPhone.replace(/[\s-]/g, ""));

  const isEmailValid =
    customerEmail.trim() === "" ||
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail.trim());

  const isOrderValid = items.length > 0 && storeId !== null;

  const canConfirm =
    isNameValid && isPhoneValid && isEmailValid && isOrderValid;
  if (items.length === 0 || storeId === null) {
    return (
      <main className="mx-auto max-w-xl px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Tu carrito está vacío
        </h1>

        <p className="mt-3 text-gray-600">
          Selecciona una tienda y agrega productos antes de finalizar tu pedido.
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
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-8">
        <Link
          to={storeId !== null ? `/catalog?storeId=${storeId}` : "/"}
          className="text-sm font-medium text-teal-700 hover:underline"
        >
          ← Volver al catálogo
        </Link>

        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          Finalizar pedido
        </h1>

        <p className="mt-2 text-gray-600">
          Completa tus datos para preparar tu pedido Pickup.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Formulario */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 md:col-span-2">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Información de contacto
          </h2>

          <form className="space-y-5">
            <div>
              <label
                htmlFor="customerName"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Nombre completo *
              </label>

              <input
                id="customerName"
                name="customerName"
                type="text"
                required
                autoComplete="name"
                placeholder="Ingresa tu nombre completo"
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                minLength={3}
                onBlur={() => setNameTouched(true)}
                aria-invalid={nameTouched && !isNameValid}
                aria-describedby={
                  nameTouched && !isNameValid ? "customerNameError" : undefined
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600"
              />

              {nameTouched && !isNameValid && (
                <p
                  id="customerNameError"
                  role="alert"
                  className="mt-1 text-sm text-red-600"
                >
                  Ingresa un nombre de al menos 3 caracteres.
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="customerPhone"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Teléfono *
              </label>

              <input
                id="customerPhone"
                name="customerPhone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="Ej. 5555-5555"
                value={customerPhone}
                onChange={(event) => setCustomerPhone(event.target.value)}
                inputMode="tel"
                onBlur={() => setPhoneTouched(true)}
                aria-invalid={phoneTouched && !isPhoneValid}
                aria-describedby={
                  phoneTouched && !isPhoneValid
                    ? "customerPhoneError"
                    : undefined
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600"
              />
              {phoneTouched && !isPhoneValid && (
                <p
                  id="customerPhoneError"
                  role="alert"
                  className="mt-1 text-sm text-red-600"
                >
                  Ingresa un número de teléfono válido de 8 dígitos.
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="customerEmail"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Correo electrónico (opcional)
              </label>

              <input
                id="customerEmail"
                name="customerEmail"
                type="email"
                autoComplete="email"
                placeholder="correo@ejemplo.com"
                value={customerEmail}
                onChange={(event) => setCustomerEmail(event.target.value)}
                onBlur={() => setEmailTouched(true)}
                aria-invalid={emailTouched && !isEmailValid}
                aria-describedby={
                  emailTouched && !isEmailValid
                    ? "customerEmailError"
                    : undefined
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600"
              />
              {emailTouched && !isEmailValid && (
                <p
                  id="customerEmailError"
                  role="alert"
                  className="mt-1 text-sm text-red-600"
                >
                  Ingresa un correo electrónico válido.
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleConfirmOrder}
              disabled={!canConfirm}
              className="w-full rounded-lg bg-teal-600 px-4 py-3 font-semibold text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Confirmar pedido
            </button>
          </form>
        </section>

        {/* Resumen del pedido */}
        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-5 text-lg font-semibold text-gray-900">
            Resumen del pedido
          </h2>

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between gap-3 text-sm"
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
              Q{total.toFixed(2)}
            </span>
          </div>
        </aside>
      </div>
    </main>
  );
}
