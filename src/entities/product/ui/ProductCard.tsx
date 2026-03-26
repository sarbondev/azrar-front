"use client";

import { ProductTypes } from "@/entities/product/model/types";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { ShoppingCart, Eye } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/store/store";
import { addToCart } from "@/entities/cart";
import { Lang } from "@/entities/project";

function ProductCard({ product }: { product: ProductTypes }) {
  const dispatch = useDispatch();

  const { items } = useSelector((state: RootState) => state.cart);

  const isProductInCart = items.some((pr) => pr._id === product?._id);

  const { i18n, t } = useTranslation();

  const lang = i18n.language as Lang;

  const title = product.translations?.[lang]?.title ?? "—";

  const categoryName =
    product.category?.[lang === "ru" ? "name_ru" : "name_uz"] ?? "";

  const image = product.images?.[0];

  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300">
      {/* Image */}
      <Link href={`/products/${product._id}`} className="block">
        <div className="relative overflow-hidden bg-gray-50 h-[250px]">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-gray-300" />
            </div>
          )}

          {/* Quick view button */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
            <span className="flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-medium px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md">
              <Eye className="w-4 h-4" />
              {t("common.view")}
            </span>
          </div>

          {/* Stock badge */}
          {product.stock === 0 && (
            <div className="absolute top-3 left-3 bg-black/70 text-white text-xs font-medium px-2.5 py-1 rounded-full">
              {t("products.outOfStock")}
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <p className="text-xs text-gray-400 mb-1">{categoryName}</p>
          <Link href={`/products/${product._id}`}>
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-[#173F5F] transition-colors">
              {title}
            </h3>
          </Link>
        </div>

        {/* Colors */}
        {product.colors?.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {product.colors.slice(0, 5).map((color, i) => (
              <div
                key={i}
                title={color.label?.[lang] ?? ""}
                className="w-4 h-4 rounded-full border border-gray-200 shadow-sm"
                style={{ backgroundColor: color.hexCode }}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-xs text-gray-400 self-center">
                +{product.colors.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Price + Cart */}
        <div className="border-t border-gray-100" />
        <div>
          <p className="text-lg font-bold text-gray-900">
            {product.price.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400">{t("currency")}</p>
        </div>

        <button
          type="button"
          disabled={isProductInCart || false}
          onClick={() => dispatch(addToCart(product))}
          className="flex items-center justify-center gap-2 bg-[#173F5F] hover:bg-[#0f2d45] disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors duration-200"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">
            {isProductInCart ? t("common.exists") : t("common.addToCart")}
          </span>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
