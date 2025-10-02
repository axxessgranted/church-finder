"use client";

import { useState } from "react";

export interface FilterState {
  denomination: string;
  languages: string[];
}

interface Props {
  onChange: (filters: FilterState) => void;
}

export default function ChurchFilter({ onChange }: Props) {
  const [filters, setFilters] = useState<FilterState>({
    denomination: "",
    languages: [],
  });

  const handleChange = (field: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onChange(newFilters);
  };

  return (
    <div className="p-4 shadow-md rounded-lg space-y-4 w-full md:w-64">
      <h2 className="font-bold text-lg">Filters</h2>

      {/* Denomination */}
      <div>
        <label className="block text-sm font-medium">Denomination</label>
        <select
          value={filters.denomination}
          onChange={(e) => handleChange("denomination", e.target.value)}
          className="w-full border rounded p-2 mt-1"
        >
          <option value="">All</option>
          <option value="Protestant">Protestant</option>
          <option value="Interdenominational">Interdenominational</option>
          <option value="Baptist">Baptist</option>
        </select>
      </div>

      {/* Language */}
      <div>
        <label className="block text-sm font-medium">Languages</label>
        <div className="mt-1 space-y-1">
          {["Japanese", "English", "Korean"].map((lang) => (
            <label key={lang} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.languages.includes(lang)}
                onChange={(e) => {
                  const newLanguages = e.target.checked
                    ? [...filters.languages, lang]
                    : filters.languages.filter((l) => l !== lang);
                  handleChange("languages", newLanguages);
                }}
              />
              {lang}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
