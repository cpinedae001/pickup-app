import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { stores } from "../data/stores";
import "leaflet/dist/leaflet.css";
import type { Store } from "../models/Store";
import { useEffect } from "react";

const storeMarkerIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
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
      className="h-full w-full rounded-lg"
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
          icon={storeMarkerIcon}
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
