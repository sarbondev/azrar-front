"use client";

import { useRouter } from "next/navigation";
import React, { SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../model/cartSlice";
import { useClientTranslation } from "@/shared/i18n";
import { useTranslation } from "react-i18next";
import { formatPrice } from "@/shared/lib/utils";
import { X, ShoppingBag, User, Phone, MapPin, Loader2 } from "lucide-react";

import type { Lang } from "@/entities/project/model/types";
import { CartItem } from "../model/types";
import axios from "axios";
import { API_URL } from "@/shared/config";

export default function CheckoutDialog({
  setIsOpen,
  items,
  totalPrice,
}: {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  items: CartItem[];
  totalPrice: number;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t, isMounted } = useClientTranslation("common");
  const { i18n } = useTranslation();
  const lang = i18n.language as Lang;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    if (items.length === 0) router.push("/");
  }, [items.length, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await axios.post(API_URL + "/orders", {
        customer: formData,
        totalPrice,
        products: items,
      });

      dispatch(clearCart());
      router.push("/order-success");
    } catch (err: unknown) {
      console.log(err);

      const e = err as { response?: { data?: { message?: string } } };
      setError(e.response?.data?.message ?? t("checkout.submitError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#173F5F]/10 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-[#173F5F]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {t("checkout.title")}
              </h2>
              <p className="text-xs text-gray-400">
                {items.length} {t("cart.itemsCount")}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Order summary */}
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            {t("checkout.orderSummary")}
          </h3>
          <div className="space-y-2 max-h-36 overflow-y-auto">
            {items.map((item) => (
              <div key={item._id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                  <img
                    src={item.images?.[0]}
                    alt={item.translations?.uz?.title ?? ""}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 truncate">
                    {item.translations?.[lang]?.title ?? ""}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.quantity} × {formatPrice(item.price)}{" "}
                    {t("common.currency")}
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-900 shrink-0">
                  {formatPrice(item.price * item.quantity)}{" "}
                  {t("common.currency")}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm font-semibold text-gray-700">
              {t("cart.total")}:
            </span>
            <span className="text-lg font-bold text-[#173F5F]">
              {formatPrice(totalPrice)} {t("common.currency")}
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <h3 className="text-sm font-semibold text-gray-700">
            {t("checkout.contactInfo")}
          </h3>

          {/* ✅ xato xabari */}
          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("checkout.fullName")} *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder={t("checkout.fullNamePlaceholder")}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#173F5F] focus:ring-1 focus:ring-[#173F5F] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("checkout.phone")} *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                placeholder="+998 90 123 45 67"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#173F5F] focus:ring-1 focus:ring-[#173F5F] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t("checkout.address")} *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder={t("checkout.addressPlaceholder")}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#173F5F] focus:ring-1 focus:ring-[#173F5F] transition-colors"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              {t("common.cancel")}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 bg-[#173F5F] hover:bg-[#0f2d45] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting ? t("checkout.submitting") : t("checkout.submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
