"use client";

import { useEffect } from "react";
import { formatPrice } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  CartItem,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/lib/store/slices/cart-slice";
import { useRouter } from "next/navigation";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, totalItems, totalPrice } = useSelector(
    (state: RootState) => state.cart,
  );
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-99 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        className="fixed top-0 right-0 w-full max-w-112.5 max-md:max-w-full h-screen bg-white z-1000 flex flex-col shadow-[-4px_0_20px_rgba(0,0,0,0.1)]"
        style={{ animation: "slideIn 0.3s ease-out" }}
      >
        <div className="flex justify-between items-center p-6 border-b border-[#e5e5e5]">
          <h2 className="text-2xl font-semibold m-0">Корзина ({totalItems})</h2>
          <button
            onClick={onClose}
            className="bg-transparent border-0 text-2xl cursor-pointer p-2 leading-none transition-transform duration-200 hover:scale-110"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {totalItems === 0 ? (
            <div className="flex items-center justify-center h-full text-[#737373]">
              <p>Корзина пуста</p>
            </div>
          ) : (
            items.map((item: CartItem) => (
              <div
                key={`${item._id}`}
                className="flex gap-4 p-4 border border-[#e5e5e5] rounded-lg mb-4 relative"
              >
                <img
                  src={item.images[0]}
                  alt={item.translations?.uz?.title}
                  className="w-20 h-20 object-cover rounded-md"
                />

                <div className="flex-1">
                  <h3 className="text-base font-semibold m-0 mb-1">
                    {item.translations?.uz?.title}
                  </h3>
                  <p className="text-base font-bold mx-2 my-0">
                    {formatPrice(item.price)} сум
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
                  title="Удалить"
                >
                  Убрать
                </button>
              </div>
            ))
          )}
        </div>

        {totalItems > 0 && (
          <div className="border-t border-[#e5e5e5] p-6 bg-[#fafafa]">
            <div className="flex justify-between items-center mb-4 text-lg">
              <span>Итого:</span>
              <strong>{formatPrice(totalPrice)} сум</strong>
            </div>
            <button
              onClick={() => {
                onClose();
                router.push("/checkout");
              }}
              className="w-full p-4 bg-black text-white border-0 rounded-md font-semibold text-base cursor-pointer transition-colors duration-200 hover:bg-[#333] mb-3"
            >
              Оформить заказ
            </button>
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full py-3 bg-transparent text-[#737373] border border-[#e5e5e5] rounded-md text-sm cursor-pointer transition-all duration-200 hover:border-black hover:text-black"
            >
              Очистить корзину
            </button>
          </div>
        )}
      </div>
    </>
  );
}
