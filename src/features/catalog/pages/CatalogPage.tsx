import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import CartDrawer from "../../cart/components/CartDrawer";
import { stores } from "../../stores/data/stores";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useCart } from "../../cart/hooks/useCart";
import type { Product } from "../models/Product";

import CartIcon from "../../../shared/components/icons/CartIcon";

export default function CatalogPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const storeId = Number(searchParams.get("storeId"));
  const selectedStore = stores.find((store) => store.id === storeId);
  const {
    items,
    storeId: cartStoreId,
    addItem,
    decrementItem,
    clearCart,
  } = useCart();

  const hasStoreConflict =
    items.length > 0 && cartStoreId !== null && cartStoreId !== storeId;
  const availableProducts = products.filter((product) =>
    product.storeIds.includes(storeId),
  );

  const handleAddProduct = (product: Product) => {
    if (cartStoreId !== null && cartStoreId !== storeId) return;

    addItem(product, storeId);
  };

  if (!selectedStore) {
    return (
      <main className="mx-auto max-w-5xl p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Tienda no encontrada
        </h1>
        <p className="mt-2 text-gray-600">
          Selecciona una tienda válida para consultar sus productos.
        </p>
        <Link
          to="/"
          className="mt-6 block rounded-lg bg-teal-600 px-5 py-3 text-center font-semibold text-white hover:bg-teal-700"
        >
          Volver al inicio
        </Link>
      </main>
    );
  }
  if (hasStoreConflict) {
    return (
      <main className="mx-auto max-w-xl px-4 py-12">
        <section className="rounded-xl border border-amber-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            ¿Deseas cambiar de tienda?
          </h1>

          <p className="mt-4 text-gray-600">
            Tienes productos de otra tienda en tu carrito. Para comprar en esta
            sucursal, primero debes vaciarlo.
          </p>

          <p className="mt-3 text-sm font-medium text-amber-700">
            Si continúas, se eliminarán los productos del carrito actual.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                clearCart();
              }}
              className="rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700"
            >
              Vaciar y cambiar de tienda
            </button>

            <Link
              to={`/catalog?storeId=${cartStoreId}`}
              className="rounded-lg border border-gray-300 px-5 py-3 text-center font-semibold text-gray-700 hover:bg-gray-50"
            >
              Conservar mi carrito
            </Link>
          </div>
        </section>
      </main>
    );
  }
  return (
    <main className="mx-auto flex h-dvh min-h-0 max-w-7xl flex-col overflow-hidden p-4 sm:p-6">
      <header className="mb-6 flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Catálogo de productos
          </h1>

          <p className="mt-2 text-gray-600">
            Tienda seleccionada:
            <span className="ml-1 font-semibold text-teal-700">
              {selectedStore.name}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="rounded-lg border border-teal-600 px-4 py-2 text-center font-medium text-teal-700 transition-colors hover:bg-teal-50"
          >
            Cambiar tienda
          </Link>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label={`Ver carrito, ${items.reduce((total, item) => total + item.quantity, 0)} productos`}
            className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
          >
            <CartIcon />

            <span className="font-semibold">
              {items.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </button>
        </div>
      </header>
      <section className="flex min-h-0 flex-1 flex-col">
        <div className="mb-5 flex shrink-0 items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-gray-900">
            Productos disponibles
          </h2>

          <span className="text-sm text-gray-500">
            {availableProducts.length} productos
          </span>
        </div>
        {availableProducts.length > 0 ? (
          <div className="min-h-0 flex-1 overflow-y-auto pr-2">
            <div className="grid grid-cols-1 gap-6 pb-2 sm:grid-cols-2 lg:grid-cols-3">
              {availableProducts.map((product) => {
                const cartItem = items.find(
                  (item) => item.product.id === product.id,
                );

                const quantity = cartItem?.quantity ?? 0;

                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={quantity}
                    onAdd={() => handleAddProduct(product)}
                    onDecrease={() => decrementItem(product.id)}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-gray-600">
            No hay productos disponibles en esta tienda.
          </p>
        )}
      </section>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </main>
  );
}
