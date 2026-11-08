import { useState } from "react";
import StoreMap from "../components/StoreMap";
import { stores } from "../data/stores";
import StoreCard from "./StoreCard";

export default function StorePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const handleSelectStore = (storeId: number) => {
    setSelectedStoreId((currentId) => (currentId === storeId ? null : storeId));
  };
  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <main className="p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Bienvenido a nuestro pickup</h1>
        <p className="mb-6 text-gray-600">Seleccione una tienda para iniciar</p>
      </header>
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        <section className="min-w-0">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Tiendas disponibles
          </h2>
          <div className="mb-4">
            <label
              htmlFor="store-search"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Buscar tienda
            </label>
            <input
              id="store-search"
              type="search"
              placeholder="Ej. Zona 10, Don Justo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-teal-500 focus:ring-teal-500"
            />
          </div>

          <div className="flex max-h-96 flex-col gap-4 overflow-y-auto pr-2">
            {filteredStores.length > 0 ? (
              filteredStores.map((store) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  isSelected={selectedStoreId === store.id}
                  onSelect={handleSelectStore}
                />
              ))
            ) : (
              <p className="rounded-lg bg-gray-50 p-4 text-center text-sm text-gray-500">
                No se encontraron tiendas.
              </p>
            )}
          </div>
        </section>
        <section className="min-w-0 " aria-label="Mapa de tiendas disponibles">
          <StoreMap />
        </section>
      </div>
    </main>
  );
}
