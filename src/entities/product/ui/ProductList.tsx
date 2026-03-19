"use client";

import React from "react";

import { useClientTranslation } from "@/shared/i18n";
import { ProductCard } from "@/entities/product";
import ProductSkeleton from "@/entities/product/ui/ProductSkeleton";
import { useGetProductsQuery } from "@/shared/api/productApi";
import { useQueryParams } from "@/shared/hooks/useQueryParams";

// ─── Main Page ────────────────────────────────────────────
export default function ProductsList() {
  const { queryParams, updateQueryParams, resetQueryParams } = useQueryParams();
  const {
    isError,
    isFetching,
    isLoading,
    data: response,
  } = useGetProductsQuery(queryParams);

  const { products, total } = response?.data || {
    products: [],
    total: 0,
    totalPages: 1,
  };

  const { t, isMounted } = useClientTranslation("common");

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              {isMounted ? t("products-page.notFound.title") : ""}
            </h2>
            <p className="text-gray-400 text-sm">
              {isMounted ? t("products-page.notFound.description") : ""}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* ── Pagination ──
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40 hover:border-[#173F5F] transition-colors cursor-pointer disabled:cursor-default"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
              )
              .reduce<(number | "...")[]>((acc, p, i, arr) => {
                if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "..." ? (
                  <span
                    key={`dots-${i}`}
                    className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p as number)}
                    className={`w-9 h-9 text-sm font-medium rounded-lg border transition-colors cursor-pointer ${
                      page === p
                        ? "bg-[#173F5F] text-white border-[#173F5F]"
                        : "border-gray-200 text-gray-600 hover:border-[#173F5F]"
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40 hover:border-[#173F5F] transition-colors cursor-pointer disabled:cursor-default"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
}
