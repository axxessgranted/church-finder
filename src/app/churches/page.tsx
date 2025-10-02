"use client";
import { useState } from "react";
import ChurchMap from "@/components/ChurchMap";
import ChurchFilter, { FilterState } from "@/components/ChurchFilter";

// TODO: Add a dropdown / search combo for city search, so that we can go by region or city.
// The city options should be pre-determined by what is available.
// Similarly with language, we should have predetermined options and ability to multiselect on a dropdown / search combo
export default function Churches() {
  const [filters, setFilters] = useState<FilterState>({
    denominations: [],
    languages: [],
  });

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Church Finder Japan</h1>

      <ChurchFilter onChange={setFilters} />
      <ChurchMap filters={filters} />
    </main>
  );
}
