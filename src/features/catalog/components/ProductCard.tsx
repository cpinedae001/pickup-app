import type { Product } from "../models/Product";

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onDecrease: () => void;
}

export default function ProductCard({
  product,
  quantity,
  onAdd,
  onDecrease,
}: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-48 w-full object-contain p-4"
      />
      <div className="space-y-3 p-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-600">{product.description}</p>
        </div>
        <p className="text-x1 font-bold text-teal-700">
          Q{product.price.toFixed(2)}
        </p>
        {quantity === 0 ? (
          <button
            type="button"
            onClick={onAdd}
            className="w-full rounded-lg bg-teal-600 px-4 py-2.5 font-medium text-white hover:bg-teal-700"
          >
            + Agregar
          </button>
        ) : (
          <div className="flex items-center justify-between rounded-lg border border-gray-300">
            <button
              type="button"
              onClick={onDecrease}
              aria-label={`Disminuir cantidad de ${product.name}`}
              className="px-4 py-2.5 text-teal-700 hover:bg-gray-100"
            >
              −
            </button>

            <span className="font-semibold" aria-live="polite">
              {quantity}
            </span>

            <button
              type="button"
              onClick={onAdd}
              aria-label={`Aumentar cantidad de ${product.name}`}
              className="px-4 py-2.5 text-teal-700 hover:bg-gray-100"
            >
              +
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
