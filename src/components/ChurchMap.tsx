"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@/lib/fixLeafletIcon"; // ensures markers render correctly
import { Church } from "@/types/churches";
import { FilterState } from "./ChurchFilter";

export default function ChurchMap({ filters }: { filters: FilterState }) {
  const [churches, setChurches] = useState<Church[]>([]);

  useEffect(() => {
    fetch("/api/churches")
      .then((res) => res.json())
      .then((data) => setChurches(data));
  }, []);

  // Apply client-side filters
  const filtered = churches.filter((c) => {
    const denomOk =
      !filters.denomination || c.denomination === filters.denomination;

    const langOk =
      filters.languages.length === 0 ||
      (c.languages &&
        c.languages.some((lang) => filters.languages.includes(lang)));

    return denomOk && langOk;
  });

  return (
    <div className="w-full h-[600px] rounded-lg shadow-lg overflow-hidden">
      <MapContainer
        center={[35.6762, 139.6503]}
        zoom={6}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filtered.map((church) => (
          <Marker
            key={church.id}
            position={[church.latitude, church.longitude]}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{church.name}</h3>
                {church.denomination && <p>{church.denomination}</p>}
                {church.languages && (
                  <p>Languages: {church.languages.join(", ")}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
