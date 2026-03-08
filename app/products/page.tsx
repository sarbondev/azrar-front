// app/products/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  X,
  ShoppingCart,
} from "lucide-react";
import { API_URL } from "@/lib/config";
import { useClientTranslation } from "@/hooks/useClientTranslation";

// ─── Types ───────────────────────────────────────────────
interface Product {
  _id: string;
  title_uz?: string;
  title_ru?: string;
  translations?: {
    uz?: { title: string };
    ru?: { title: string };
  };
  price: number;
  discount_price?: number;
  images?: string[];
  image_urls?: string[];
  category: string;
  is_active?: boolean;
}

interface ApiResponse {
  success: boolean;
  data: {
    products: Product[];
    total?: number;
    totalPages?: number;
  };
}

const CATEGORIES = ["all", "bathrobe", "towel", "set", "accessories"];
const SORT_OPTIONS = ["newest", "price_asc", "price_desc"];
const LIMIT = 12;

// ─── Product Card ─────────────────────────────────────────
function ProductCard({ product, lang }: { product: Product; lang: string }) {
  const title =
    product.translations?.[lang as "uz" | "ru"]?.title ||
    (product[`title_${lang}` as keyof Product] as string) ||
    "—";

  const images = product.images || product.image_urls || [];
  const image = images[0];
  const hasDiscount =
    product.discount_price && product.discount_price < product.price;

  return (
    <Link href={`/products/${product._id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[3/4]">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
        )}

        {/* Discount badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
            -
            {Math.round(
              ((product.price - product.discount_price!) / product.price) * 100,
            )}
            %
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
      </div>

      <div className="mt-3 px-1">
        <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-base font-bold text-[#173F5F]">
            {(product.discount_price || product.price).toLocaleString()} so'm
          </span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">
              {product.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ─── Skeleton ─────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="rounded-2xl bg-gray-200 aspect-[3/4]" />
      <div className="mt-3 px-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────
export default function ProductsPage() {
  const { t, isMounted } = useClientTranslation("common");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const lang = isMounted
    ? ["uz", "ru"].includes(localStorage.getItem("i18nextLng") || "")
      ? localStorage.getItem("i18nextLng")!
      : "uz"
    : "uz";

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(LIMIT),
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(category !== "all" && { category }),
        ...(sort === "price_asc" && { sort: "price", order: "asc" }),
        ...(sort === "price_desc" && { sort: "price", order: "desc" }),
        ...(sort === "newest" && { sort: "createdAt", order: "desc" }),
      });

      const res = await fetch(`${API_URL}/api/products?${params}`);
      const data: ApiResponse = await res.json();

      if (data.success) {
        setProducts(data.data.products || []);
        setTotalPages(data.data.totalPages || 1);
        setTotal(data.data.total || 0);
      }
    } catch (err) {
      console.error("Products fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, category, sort]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Category/sort change → reset page
  const handleCategory = (cat: string) => {
    setCategory(cat);
    setPage(1);
  };

  const handleSort = (s: string) => {
    setSort(s);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── Header bar ── */}
      <div className="border-b border-gray-100 sticky top-16 z-30 bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                isMounted ? t("products-page.searchPlaceholder") : ""
              }
              className="w-full pl-9 pr-8 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#173F5F] transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => handleSort(e.target.value)}
            className="hidden sm:block text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#173F5F] cursor-pointer"
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {isMounted ? t(`products-page.sort.${s}`) : s}
              </option>
            ))}
          </select>

          {/* Filter toggle (mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden flex items-center gap-1.5 text-sm border border-gray-200 rounded-lg px-3 py-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          {/* Total count */}
          <span className="hidden md:block text-sm text-gray-400 ml-auto whitespace-nowrap">
            {total} {isMounted ? t("products-page.results") : ""}
          </span>
        </div>

        {/* Category pills */}
        <div className="container mx-auto px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`shrink-0 text-sm px-4 py-1.5 rounded-full border transition-colors cursor-pointer ${
                category === cat
                  ? "bg-[#173F5F] text-white border-[#173F5F]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#173F5F] hover:text-[#173F5F]"
              }`}
            >
              {isMounted ? t(`products-page.categories.${cat}`) : cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: LIMIT }).map((_, i) => (
              <SkeletonCard key={i} />
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
            {search && (
              <button
                onClick={() => setSearch("")}
                className="mt-4 text-sm text-[#173F5F] underline"
              >
                {isMounted ? t("products-page.notFound.clearSearch") : ""}
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} lang={lang} />
            ))}
          </div>
        )}

        {/* ── Pagination ── */}
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
        )}
      </div>
    </div>
  );
}
