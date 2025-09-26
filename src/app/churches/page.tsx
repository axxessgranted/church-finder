"use client";

import { useEffect, useState } from "react";

// TODO: Add a dropdown / search combo for city search, so that we can go by region or city.
// The city options should be pre-determined by what is available.
// Similarly with language, we should have predetermined options and ability to multiselect on a dropdown / search combo
export default function Churches() {
  const [churches, setChurches] = useState([]);
  const [city, setCity] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    async function fetchChurches() {
      const params = new URLSearchParams();
      if (city) params.append("city", city);
      if (language) params.append("language", language);

      const res = await fetch(`/api/churches?${params.toString()}`);
      const data = await res.json();
      setChurches(data);
    }
    fetchChurches();
  }, [city, language]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Find a Church</h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <ul className="space-y-2">
        {churches.map((church) => (
          <li key={church.id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-semibold">{church.name}</h2>
            <p>
              {church.city}, {church.prefecture}
            </p>
            <p>Languages: {church.languages?.join(", ")}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
