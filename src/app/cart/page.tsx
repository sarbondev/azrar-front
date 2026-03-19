"use client";

import { formatPrice } from "@/shared/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/store/store";
import {
  CartItem,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/entities/cart";
import { useClientTranslation } from "@/shared/i18n";

export default function CartPage() {
  const dispatch = useDispatch();
  const { t, isMounted } = useClientTranslation("common");

  const { items, totalItems, totalPrice } = useSelector(
    (state: RootState) => state.cart,
  );

  if (!isMounted) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-2xl p-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white min-h-screen flex flex-col shadow-[-4px_0_20px_rgba(0,0,0,0.1)]"
      style={{ animation: "slideIn 0.3s ease-out" }}
    >
      <div className="flex-1 overflow-y-auto p-4">
        {totalItems === 0 ? (
          <div className="flex items-center justify-center h-full text-[#737373]">
            <p>{t("cart.empty")}</p>
          </div>
        ) : (
          items.map((item: CartItem) => (
            <div
              key={`${item._id}`}
              className="flex gap-4 p-4 border border-[#e5e5e5] rounded-lg mb-4 relative"
            >
              <img
                src={item.images?.[0]}
                alt={item.translations?.uz?.title || ""}
                className="w-20 h-20 object-cover rounded-md"
                loading="lazy"
              />

              <div className="flex-1">
                <h3 className="text-base font-semibold m-0 mb-1">
                  {item.translations?.uz?.title || ""}
                </h3>
                <p className="text-base font-bold mx-2 my-0">
                  {formatPrice(item.price)} {t("currency")}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item))}
                    className="w-7 h-7 border border-[#e5e5e5] bg-white rounded cursor-pointer text-xl flex items-center justify-center transition-all duration-200 hover:bg-[#f5f5f5] hover:border-black"
                  >
                    −
                  </button>
                  <span className="font-semibold min-w-7.5 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => dispatch(increaseQuantity(item))}
                    className="w-7 h-7 border border-[#e5e5e5] bg-white rounded cursor-pointer text-xl flex items-center justify-center transition-all duration-200 hover:bg-[#f5f5f5] hover:border-black"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item))}
                className="absolute top-4 right-4 bg-transparent border-0 text-base cursor-pointer p-1 opacity-60 transition-opacity duration-200 hover:opacity-100"
                title={t("cart.remove")}
              >
                {t("cart.removeBtn")}
              </button>
            </div>
          ))
        )}
      </div>

      {totalItems > 0 && (
        <div className="border-t border-[#e5e5e5] p-6 bg-[#fafafa]">
          <div className="flex justify-between items-center mb-4 text-lg">
            <span>{t("cart.total")}:</span>
            <strong>
              {formatPrice(totalPrice)} {t("currency")}
            </strong>
          </div>
          <button
            className="w-full p-4 bg-black text-white border-0 rounded-md font-semibold text-base cursor-pointer transition-colors duration-200 hover:bg-[#333] mb-3"
          >
            {t("cart.checkout")}
          </button>
          <button
            onClick={() => dispatch(clearCart())}
            className="w-full py-3 bg-transparent text-[#737373] border border-[#e5e5e5] rounded-md text-sm cursor-pointer transition-all duration-200 hover:border-black hover:text-black"
          >
            {t("cart.clearCart")}
          </button>
        </div>
      )}
    </div>
  );
}
