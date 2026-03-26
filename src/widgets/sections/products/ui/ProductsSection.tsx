"use client";

import React, { useState, useEffect } from "react";
import { ProductCard } from "@/entities/product";
import { API_URL } from "@/shared/config";
import { useClientTranslation } from "@/shared/i18n";
import { ProductTypes } from "@/entities/product/model/types";
import { EmptyState } from "../../emptyState/ui/EmptyState";

export default function ProductsSection() {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, isMounted } = useClientTranslation("common");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();
        if (data.success) {
          setProducts(data.data.products || []);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (!isMounted || loading) {
    return (
      <section className="min-h-screen bg-white p-4 md:p-8 animate-pulse">
        <div className="container mx-auto">
          <div className="mb-10 md:mb-14 space-y-3">
            <div className="h-10 bg-gray-200 rounded w-3/4" />
            <div className="h-10 bg-gray-200 rounded w-1/2" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white p-4 md:p-8">
      <div className="container mx-auto">
        <header className="mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2 leading-tight">
            {t("products.bestOffers")}{" "}
            <span className="text-[#de1b38]">{t("products.offers")}</span>
            <br />
            {t("products.forYourObject")}
          </h2>
        </header>

        {products.length === 0 ? (
          <EmptyState
            title={t("products.notFound")}
            description="Hozircha bu bo'limda mahsulotlar mavjud emas."
          >
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            >
              Qayta yuklash
            </button>
          </EmptyState>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
