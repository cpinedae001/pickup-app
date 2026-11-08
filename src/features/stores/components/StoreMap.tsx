import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";

import { stores } from "../data/stores";
import "leaflet/dist/leaflet.css";

export default function StoreMap() {
  return (
    <MapContainer
      center={[14.599, -90.507]}
      zoom={12}
      scrollWheelZoom={true}
      zoomControl={false}
      className="h-96 w-full rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topright" />
      {stores.map((store) => (
        <Marker key={store.id} position={[store.latitude, store.longitude]}>
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
