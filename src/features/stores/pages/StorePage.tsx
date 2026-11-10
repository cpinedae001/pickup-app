import { useState } from "react";
import { useNavigate } from "react-router";
import StoreMap from "../components/StoreMap";
import { stores } from "../data/stores";
import StoreCard from "./StoreCard";

export default function StorePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const handleSelectStore = (storeId: number) => {
    setSelectedStoreId((currentId) => (currentId === storeId ? null : storeId));
  };
  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const handleContinue = () => {
    if (selectedStoreId === null) return;

    navigate(`/catalog?storeId=${selectedStoreId}`);
  };
  const selectedStore = stores.find((store) => store.id === selectedStoreId);
  return (
    <main className="flex h-dvh min-h-0 flex-col gap-4 overflow-hidden p-4 lg:gap-6 lg:p-6">
      {/* Encabezado siempre visible */}
      <header className="shrink-0">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Bienvenido a nuestro pickup
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Seleccione una tienda para iniciar
        </p>
      </header>

      {/* Contenido principal */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        {/* Listado de tiendas */}
        <section className="flex min-h-0 min-w-0 flex-col">
          <h2 className="mb-3 shrink-0 text-lg font-semibold text-gray-900">
            Tiendas disponibles
          </h2>

          <div className="mb-3 shrink-0">
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

          <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-2">
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

        {/* Mapa */}
        <section
          className="h-44 min-h-0 min-w-0 shrink-0 overflow-hidden rounded-lg sm:h-56 lg:h-auto lg:min-h-0 lg:shrink"
          aria-label="Mapa de tiendas disponibles"
        >
          <StoreMap
            selectedStore={selectedStore}
            onSelectStore={handleSelectStore}
          />
        </section>
      </div>

      {/* Acción inferior siempre visible */}
      <div className="shrink-0 border-t border-gray-200 bg-white pt-3">
        <button
          type="button"
          onClick={handleContinue}
          disabled={selectedStoreId === null}
          className="w-full rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-gray-300 sm:ml-auto sm:block sm:w-auto"
        >
          Escoge tus productos
        </button>
      </div>
    </main>
  );
}
