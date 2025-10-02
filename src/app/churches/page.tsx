"use client";
import { useEffect, useState } from "react";
import ChurchMap from "@/components/ChurchMap";
import { Church } from "@/types/churches";

// TODO: Add a dropdown / search combo for city search, so that we can go by region or city.
// The city options should be pre-determined by what is available.
// Similarly with language, we should have predetermined options and ability to multiselect on a dropdown / search combo
export default function Churches() {
  const [churches, setChurches] = useState<Church[]>([]);

  useEffect(() => {
    async function fetchChurches() {
      const res = await fetch("/api/churches");
      const data = await res.json();
      setChurches(data);
    }
    fetchChurches();
  }, []);

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Church Finder Japan</h1>
      <ChurchMap churches={churches} />
      <ul className="space-y-2">
        {churches.map((church) => (
          <li key={church.id} className="p-4 border rounded shadow">
            <h2 className="font-semibold">{church.name}</h2>
            <p>
              {church.city}, {church.prefecture}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
