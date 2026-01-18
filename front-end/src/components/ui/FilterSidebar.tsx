"use client";

import React, { useState } from "react";

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  type: "checkbox" | "radio";
}

export interface PriceRange {
  min: number;
  max: number;
}

interface FilterSidebarProps {
  priceRange?: PriceRange;
  onPriceChange?: (range: PriceRange) => void;
  filterGroups: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, optionId: string, checked: boolean) => void;
  onClearAll?: () => void;
  className?: string;
}

export function FilterSidebar({
  priceRange,
  onPriceChange,
  filterGroups,
  selectedFilters,
  onFilterChange,
  onClearAll,
  className = "",
}: FilterSidebarProps) {
  const [localPriceRange, setLocalPriceRange] = useState<PriceRange>(
    priceRange || { min: 0, max: 200 },
  );

  const hasActiveFilters = Object.values(selectedFilters).some(
    (arr) => arr.length > 0,
  );

  return (
    <aside className={`w-full ${className}`}>
      {/* Header with Clear option */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold text-text-primary">
          Filters
        </h2>
        {hasActiveFilters && onClearAll && (
          <button
            onClick={onClearAll}
            className="text-sm text-primary hover:text-primary-hover transition-colors cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Price Range Filter */}
      {onPriceChange && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wide">
            Price Range
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-xs text-text-muted mb-1 block">
                  Min
                </label>
                <input
                  type="number"
                  value={localPriceRange.min}
                  onChange={(e) => {
                    const newRange = {
                      ...localPriceRange,
                      min: Number(e.target.value),
                    };
                    setLocalPriceRange(newRange);
                    onPriceChange(newRange);
                  }}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  min={0}
                />
              </div>
              <span className="text-text-muted mt-5">—</span>
              <div className="flex-1">
                <label className="text-xs text-text-muted mb-1 block">
                  Max
                </label>
                <input
                  type="number"
                  value={localPriceRange.max}
                  onChange={(e) => {
                    const newRange = {
                      ...localPriceRange,
                      max: Number(e.target.value),
                    };
                    setLocalPriceRange(newRange);
                    onPriceChange(newRange);
                  }}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  min={0}
                />
              </div>
            </div>
            {/* Quick price buttons */}
            <div className="flex flex-wrap gap-2">
              {["$0-$30", "$30-$50", "$50-$100", "$100+"].map((range, idx) => {
                const ranges = [
                  { min: 0, max: 30 },
                  { min: 30, max: 50 },
                  { min: 50, max: 100 },
                  { min: 100, max: 500 },
                ];
                return (
                  <button
                    key={range}
                    onClick={() => {
                      setLocalPriceRange(ranges[idx]);
                      onPriceChange(ranges[idx]);
                    }}
                    className="px-3 py-1.5 text-xs rounded-full border border-border hover:border-primary hover:text-primary transition-colors cursor-pointer"
                  >
                    {range}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Filter Groups */}
      {filterGroups.map((group) => (
        <div key={group.id} className="mb-6">
          <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">
            {group.label}
          </h3>
          <div className="space-y-2">
            {group.options.map((option) => {
              const isChecked = selectedFilters[group.id]?.includes(option.id);
              return (
                <label
                  key={option.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type={group.type}
                    name={group.id}
                    checked={isChecked}
                    onChange={(e) =>
                      onFilterChange(group.id, option.id, e.target.checked)
                    }
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary cursor-pointer accent-primary"
                  />
                  <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                    {option.label}
                  </span>
                  {option.count !== undefined && (
                    <span className="text-xs text-text-muted ml-auto">
                      ({option.count})
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </aside>
  );
}

// Sort dropdown component
export type SortOption = {
  id: string;
  label: string;
};

interface SortDropdownProps {
  options: SortOption[];
  selected: string;
  onChange: (id: string) => void;
  className?: string;
}

export function SortDropdown({
  options,
  selected,
  onChange,
  className = "",
}: SortDropdownProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-text-secondary">Sort by:</span>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border border-border rounded-lg text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
