"use client";

import { useParams } from "next/navigation";
import { useGetProductByIdQuery } from "@/shared/api/productApi";
import { useTranslation } from "react-i18next";
import { Lang } from "@/entities/project";
import ProductGallery from "@/entities/product/ui/ProductGallery";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/store/store";
import { addToCart } from "@/entities/cart";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;

  const { data: response, isLoading, isError } = useGetProductByIdQuery(id);

  const product = response?.data.product;

  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

  const isProductInCart = items.some((pr) => pr._id === product?._id);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-8 h-8 border-4 border-[#173F5F] border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (isError || !product)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">{t("products.notFound")}</p>
      </div>
    );

  const translation = product.translations[lang] ?? product.translations.uz;

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Gallery */}
        <ProductGallery images={product.images} title={translation.title} />

        {/* Info */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="text-sm text-gray-400">
              {lang === "ru"
                ? product.category?.name_ru
                : product.category?.name_uz}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">
              {translation.title}
            </h1>
          </div>

          <p className="text-2xl font-semibold text-[#173F5F]">
            {product.price.toLocaleString()} {t("common.currency")}
          </p>

          <p className="text-gray-600 leading-relaxed">
            {translation.description}
          </p>

          <hr />

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                {t("products.colors")}:
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-full border border-gray-200"
                  >
                    <div
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.hexCode ?? "#ccc" }}
                    />
                    <span className="text-xs text-gray-600">
                      {color.label?.[lang] ?? color.label?.uz ?? ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cart */}
          <button
            type="button"
            disabled={isProductInCart}
            onClick={() => dispatch(addToCart(product))}
            className="flex items-center justify-center gap-2 bg-[#173F5F] hover:bg-[#0f2d45] disabled:bg-gray-200 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors duration-200"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">
              {isProductInCart ? t("common.exists") : t("common.addToCart")}
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}
