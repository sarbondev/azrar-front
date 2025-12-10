"use client";

import React, { useRef, useState, useEffect } from "react";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { RootState } from "@/lib/store/store";
import { useSelector } from "react-redux";
import Image from "next/image";

const NAV_LINKS = [
  { href: "#", label: "Товары" },
  { href: "#", label: "О компании" },
  { href: "#", label: "Решения" },
  { href: "#", label: "Контакты" },
];

function Header() {
  const searchWrapperRef = useRef(null);
  const searchInputRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cart = useSelector((state: RootState) => state.cart);
  const totalItemsInCart = cart.length;

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <header className="w-full bg-white h-16 min-h-16 sticky top-0 z-50 p-2">
        <div className="container mx-auto flex items-center justify-between py-2 h-full">
          <div className="flex items-center min-w-0 lg:min-w-[140px] h-full">
            <Image
              width={150}
              height={75}
              src="/logo_dark.svg"
              alt="Azrar Logo"
              className="h-7 w-auto min-w-8"
            />
          </div>

          <nav className="hidden lg:flex flex-1 h-full">
            <ul className="flex gap-6 justify-start items-center h-full m-0 p-0 list-none">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-gray-700 no-underline transition-colors hover:text-blue-600"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4 justify-end h-full">
            <div
              ref={searchWrapperRef}
              className="hidden lg:flex relative items-center overflow-hidden w-[260px] h-10 min-h-10 rounded-lg border border-gray-200 px-3 transition-all duration-300 ease-in-out"
            >
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-500 h-[26px] w-[26px] p-0 z-10 pointer-events-none">
                <Search className="h-[17px] w-[17px]" strokeWidth={2} />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Поиск товаров"
                autoComplete="off"
                className="opacity-100 w-full bg-transparent pointer-events-auto pl-8 pr-2 min-w-0 border-none h-full transition-all duration-300 relative z-10 text-sm focus:outline-none text-gray-900"
              />
            </div>

            <div className="relative h-full flex items-center">
              <button className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 bg-white relative cursor-pointer transition-colors hover:bg-gray-100">
                <ShoppingCart
                  className="w-5 h-5 text-gray-500"
                  strokeWidth={2}
                />
                <span
                  className={`${
                    totalItemsInCart >= 1 ? "absolute" : "hidden"
                  } -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center leading-none font-medium`}
                >
                  {totalItemsInCart}
                </span>
              </button>
            </div>

            <button className="px-3 sm:px-4 h-9 bg-[#173F5F] text-white font-medium text-sm rounded-lg min-w-0 lg:min-w-[120px] cursor-pointer transition-colors border-none hover:bg-[#122f44]">
              <span className="hidden sm:inline">Личный кабинет</span>

              <span className="sm:hidden">Вход</span>
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 bg-white relative cursor-pointer transition-colors hover:bg-gray-100 ml-1"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-500" strokeWidth={2} />
              ) : (
                <Menu className="w-5 h-5 text-gray-500" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`lg:hidden fixed inset-y-0 right-0 top-16 bg-white z-40 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } w-full md:w-96 p-6 shadow-xl overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-6">
          <div className="relative flex items-center overflow-hidden h-10 min-h-10 rounded-lg border border-gray-300 bg-gray-100 px-3 w-full shadow-inner">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-500 h-[26px] w-[26px] p-0 z-10 pointer-events-none">
              <Search className="h-[17px] w-[17px]" strokeWidth={2} />
            </div>
            <input
              type="text"
              placeholder="Поиск товаров..."
              autoComplete="off"
              className="w-full bg-transparent pl-8 pr-2 min-w-0 border-none h-full text-base focus:outline-none text-gray-900"
            />
          </div>

          <nav>
            <ul className="flex flex-col gap-1 list-none m-0 p-0">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="block p-4 text-lg font-semibold text-gray-700 rounded-lg hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Header;
