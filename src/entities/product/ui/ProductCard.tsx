"use client";

import { ProductTypes } from "@/entities/product/model/types";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

function ProductCard({ product }: { product: ProductTypes }) {
  const { i18n, t } = useTranslation();

  const currentLang = i18n.language as "uz" | "ru";
  const title =
    product.translations?.[currentLang]?.title ||
    (product[`title_${currentLang}` as keyof ProductTypes] as string) ||
    "—";
  const categoryName =
    product.category?.[currentLang === "ru" ? "name_ru" : "name_uz"] ||
    "Kategoriya";

  const images = product.images || [];
  const image = images[0];

  return (
    <Link href={`/products/${product._id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[3/4]">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
      </div>

      <div className="mt-3 px-1">
        <p className="text-sm font-medium text-gray-900 truncate mb-2">
          {categoryName}
        </p>
        <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-400 line-through">
            {product.price.toLocaleString()} {t("currency")}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
