"use client";

import { useGetAllCategoriesQuery } from "@/shared/api/categoryApi";
import { useQueryParams } from "@/shared/hooks/useQueryParams";
import i18n from "@/shared/i18n/i18n";
import { useClientTranslation } from "@/shared/i18n/useClientTranslation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState, useCallback } from "react";

const SORT_OPTIONS = [
  { value: "newest", labelKey: "products.filter.newest" },
  { value: "price_asc", labelKey: "products.filter.price_asc" },
  { value: "price_desc", labelKey: "products.filter.price_desc" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

interface Filters {
  search: string;
  category: string;
  sort: SortValue;
}

const DEFAULT_FILTERS: Filters = {
  search: "",
  category: "all",
  sort: "newest",
};

export default function ProductFilter() {
  const currentLanguage = i18n.language || "en";
  const { t, isMounted } = useClientTranslation("common");
  const { updateQueryParams, resetQueryParams } = useQueryParams();

  const { data: response } = useGetAllCategoriesQuery();
  const { categories } = response?.data || { categories: [] };

  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [showFilters, setShowFilters] = useState(false);

  const updateFilter = useCallback(
    <K extends keyof Filters>(key: K, value: Filters[K]) => {
      const updated = { ...filters, [key]: value };
      setFilters(updated);
      updateQueryParams(updated);
    },
    [filters, updateQueryParams],
  );

  const handleReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    resetQueryParams();
  }, [resetQueryParams]);

  const hasActiveFilters =
    filters.search !== DEFAULT_FILTERS.search ||
    filters.category !== DEFAULT_FILTERS.category ||
    filters.sort !== DEFAULT_FILTERS.sort;

  return (
    <div className="border-b border-gray-100 sticky top-16 z-30 bg-white/90 backdrop-blur-sm">
      {/* ── Main bar ── */}
      <div className="container mx-auto px-4 py-3 flex items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            placeholder={isMounted ? t("products-page.searchPlaceholder") : ""}
            className="w-full pl-9 pr-8 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#173F5F] transition-colors"
          />
          {filters.search && (
            <button
              onClick={() => updateFilter("search", "")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort — desktop only */}
        <select
          value={filters.sort}
          onChange={(e) => updateFilter("sort", e.target.value as SortValue)}
          className="hidden sm:block text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#173F5F] cursor-pointer"
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {isMounted ? t(s.labelKey) : s.value}
            </option>
          ))}
        </select>

        {/* Filter toggle — mobile only */}
        <button
          onClick={() => setShowFilters((p) => !p)}
          className={`sm:hidden flex items-center gap-1.5 text-sm border rounded-lg px-3 py-2 cursor-pointer transition-colors ${
            showFilters
              ? "bg-[#173F5F] text-white border-[#173F5F]"
              : "border-gray-200 text-gray-600"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          {hasActiveFilters && (
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          )}
        </button>

        {/* Reset — only when active filters exist */}
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isMounted ? t("products.filter.reset") : "Reset"}
            </span>
          </button>
        )}
      </div>

      {/* ── Mobile filter panel ── */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ${
          showFilters ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 pb-3 flex flex-col gap-3">
          {/* Sort mobile */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 shrink-0">
              {isMounted ? t("products.filter.sortBy") : "Sort by"}:
            </span>
            <select
              value={filters.sort}
              onChange={(e) =>
                updateFilter("sort", e.target.value as SortValue)
              }
              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#173F5F] cursor-pointer"
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {isMounted ? t(s.labelKey) : s.value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Category pills ── */}
      <div className="container mx-auto px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => updateFilter("category", "all")}
          className={`shrink-0 text-sm px-4 py-1.5 rounded-full border transition-colors cursor-pointer ${
            filters.category === "all"
              ? "bg-[#173F5F] text-white border-[#173F5F]"
              : "bg-white text-gray-600 border-gray-200 hover:border-[#173F5F] hover:text-[#173F5F]"
          }`}
        >
          {isMounted ? t("products.filter.all") : "All"}
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => updateFilter("category", cat._id)}
            className={`shrink-0 text-sm px-4 py-1.5 rounded-full border transition-colors cursor-pointer ${
              filters.category === cat._id
                ? "bg-[#173F5F] text-white border-[#173F5F]"
                : "bg-white text-gray-600 border-gray-200 hover:border-[#173F5F] hover:text-[#173F5F]"
            }`}
          >
            {isMounted
              ? currentLanguage === "ru"
                ? cat.name_ru
                : cat.name_uz
              : ""}
          </button>
        ))}
      </div>
    </div>
  );
}
