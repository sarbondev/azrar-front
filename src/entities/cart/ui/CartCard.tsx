"use client";

import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../model/cartSlice";
import { CartItem } from "../model/types";
import { formatPrice } from "@/shared/lib/utils";
import { Minus, Plus, X } from "lucide-react";
import { useClientTranslation } from "@/shared/i18n";
import { Lang } from "@/entities/project/model/types";
import { useTranslation } from "react-i18next";

export default function CartCard({ item }: { item: CartItem }) {
  const dispatch = useDispatch();
  const { t } = useClientTranslation("common");
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language as Lang;

  return (
    <div className="bg-white rounded-2xl p-4 flex gap-4 border border-gray-200 transition-all">
      {/* Image */}
      <Link
        href={`/products/${item._id}`}
        className="shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-gray-50"
      >
        <img
          src={item.images?.[0]}
          alt={item.translations?.uz?.title ?? ""}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
            {item.translations?.[currentLanguage]?.title ?? "—"}
          </h3>
          <button
            onClick={() => dispatch(removeFromCart({ _id: item._id }))}
            className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-base font-bold text-[#173F5F] mt-1">
          {formatPrice(item.price * item.quantity)}{" "}
          <span className="text-xs font-normal text-gray-400">
            {t("currency")}
          </span>
        </p>

        {/* Quantity */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => dispatch(decreaseQuantity({ _id: item._id }))}
            className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center hover:border-gray-400 hover:bg-gray-50 transition-all"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-sm font-semibold w-6 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => dispatch(increaseQuantity({ _id: item._id }))}
            className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center hover:border-gray-400 hover:bg-gray-50 transition-all"
          >
            <Plus className="w-3 h-3" />
          </button>

          {item.quantity > 1 && (
            <span className="text-xs text-gray-400 ml-1">
              {formatPrice(item.price)} {t("currency")} × {item.quantity}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
