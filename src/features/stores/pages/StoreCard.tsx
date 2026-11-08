import type { Store } from "../models/Store";

interface StoreCardProps {
  store: Store;
  isSelected?: boolean;
  onSelect: (storeId: number) => void;
}

export default function StoreCard({
  store,
  isSelected,
  onSelect,
}: StoreCardProps) {
  return (
    <article
      className={`rounded-xl border bg-white p-5 shadow-sm transition-all ${
        isSelected
          ? "border-teal-600 ring-2 ring-teal-100"
          : "border-gray-200 hover:shadow-md"
      }`}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-xl">
          🏬
        </div>

        <h3 className="text-lg font-semibold text-gray-900">{store.name}</h3>
      </div>

      <div className="mb-5 space-y-3 text-sm text-gray-600">
        <p className="flex items-center gap-2">
          <span aria-hidden="true">📍</span>
          {store.address}
        </p>

        <p className="flex items-center gap-2">
          <span aria-hidden="true">🕒</span>
          {store.hours}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onSelect(store.id)}
        aria-pressed={isSelected}
        className="w-full rounded-lg bg-teal-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-teal-700"
      >
        {isSelected ? "Tienda seleccionada ✓" : "Seleccionar tienda"}
      </button>
    </article>
  );
}
