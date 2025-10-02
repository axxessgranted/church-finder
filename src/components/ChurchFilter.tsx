"use client";

import { useState } from "react";

export interface FilterState {
  denominations: string[];
  languages: string[];
}

interface Props {
  onChange: (filters: FilterState) => void;
}

export default function ChurchFilter({ onChange }: Props) {
  const [filters, setFilters] = useState<FilterState>({
    denominations: [],
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
        <label className="block text-sm font-medium">Denominations</label>
        <div className="mt-1 space-y-1">
          {["Interdenominational", "Baptist", "Protestant"].map((denom) => (
            <label key={denom} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.denominations.includes(denom)}
                onChange={(e) => {
                  const newDenoms = e.target.checked
                    ? [...filters.denominations, denom]
                    : filters.denominations.filter((d) => d !== denom);
                  handleChange("denominations", newDenoms);
                }}
              />
              {denom}
            </label>
          ))}
        </div>
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
