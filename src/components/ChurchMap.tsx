"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "@/lib/fixLeafletIcon"; // ensures markers render correctly

export default function ChurchMap({ churches }) {
  // Default center: Tokyo
  const position = [35.6762, 139.6503];

  return (
    <MapContainer
      center={position}
      zoom={5}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {churches.map((church) => (
        <Marker key={church.id} position={[church.latitude, church.longitude]}>
          <Popup>
            <h2 className="font-bold">{church.name}</h2>
            <p>
              {church.city}, {church.prefecture}
            </p>
            <p>{church.languages?.join(", ")}</p>
            {church.website && (
              <a
                href={church.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Visit Website
              </a>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
