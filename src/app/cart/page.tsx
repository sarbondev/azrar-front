"use client";

import { formatPrice } from "@/shared/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/store/store";
import { CartItem, clearCart } from "@/entities/cart";
import { useClientTranslation } from "@/shared/i18n";
import { ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import CartCard from "@/entities/cart/ui/CartCard";

export default function CartPage() {
  const dispatch = useDispatch();
  const { t, isMounted } = useClientTranslation("common");
  const { items, totalItems, totalPrice } = useSelector(
    (state: RootState) => state.cart,
  );

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-2xl px-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-gray-200 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (totalItems === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-6 px-4">
        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
          <ShoppingBag className="w-10 h-10 text-gray-300" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {t("cart.empty")}
          </h2>
          <p className="text-gray-400 text-sm">{t("cart.emptyDescription")}</p>
        </div>
        <Link
          href="/products"
          className="bg-[#173F5F] hover:bg-[#0f2d45] text-white text-sm font-medium px-8 py-3 rounded-xl transition-colors"
        >
          {t("cart.continueShopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t("cart.title")}
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {totalItems} {t("cart.itemsCount")}
            </p>
          </div>
          <button
            onClick={() => dispatch(clearCart())}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            {t("cart.clearCart")}
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item: CartItem) => (
              <CartCard key={item._id} item={item} />
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 sticky top-24">
              <h2 className="text-base font-semibold text-gray-900 mb-4">
                {t("cart.summary")}
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>{t("cart.itemsCount")}:</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>{t("cart.subtotal")}:</span>
                  <span>
                    {formatPrice(totalPrice)} {t("currency")}
                  </span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex justify-between font-bold text-base text-gray-900">
                  <span>{t("cart.total")}:</span>
                  <span>
                    {formatPrice(totalPrice)} {t("currency")}
                  </span>
                </div>
              </div>

              <button className="w-full mt-6 bg-[#173F5F] hover:bg-[#0f2d45] text-white font-semibold text-sm py-3.5 rounded-xl transition-colors">
                {t("cart.checkout")}
              </button>

              <Link
                href="/products"
                className="block text-center text-sm text-gray-400 hover:text-gray-600 mt-3 transition-colors"
              >
                {t("cart.continueShopping")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
