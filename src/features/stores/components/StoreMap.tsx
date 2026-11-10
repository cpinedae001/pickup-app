import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
} from "react-leaflet";

import { stores } from "../data/stores";
import "leaflet/dist/leaflet.css";
import type { Store } from "../models/Store";
import { useEffect } from "react";

interface StoreMapProps {
  selectedStore?: Store;
  onSelectStore: (storeId: number) => void;
}

function MapUpdater({ selectedStore }: Pick<StoreMapProps, "selectedStore">) {
  const map = useMap();

  useEffect(() => {
    if (selectedStore) {
      map.flyTo([selectedStore.latitude, selectedStore.longitude], 15);
    }
  }, [selectedStore, map]);

  return null;
}

export default function StoreMap({
  selectedStore,
  onSelectStore,
}: StoreMapProps) {
  return (
    <MapContainer
      center={[14.599, -90.507]}
      zoom={12}
      scrollWheelZoom={true}
      zoomControl={false}
      className="h-96 w-full rounded-lg"
    >
      <MapUpdater selectedStore={selectedStore} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topright" />
      {stores.map((store) => (
        <Marker
          key={store.id}
          position={[store.latitude, store.longitude]}
          eventHandlers={{ click: () => onSelectStore(store.id) }}
        >
          <Popup>
            <strong>{store.name}</strong>
            <p>{store.address}</p>
            <p>{store.hours}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
