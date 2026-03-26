"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { LanguageSwitcher } from "@/features/language-switcher";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { RootState } from "@/shared/store/store";
import { useSelector } from "react-redux";
import { useClientTranslation } from "@/shared/i18n";

const NAV_LINKS = [
  { href: "/", labelKey: "nav.home" },
  { href: "/products", labelKey: "nav.products" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/contacts", labelKey: "nav.contacts" },
];

function Header() {
  const { t } = useClientTranslation("common");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { items } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
          <Link
            href={"/"}
            className="flex items-center min-w-0 lg:min-w-[140px] h-full"
          >
            <Image
              width={150}
              height={75}
              src="/logo_dark.svg"
              alt="Azrar Logo"
              className="h-7 w-auto min-w-8"
              priority
            />
          </Link>

          <nav
            className="hidden lg:flex flex-1 h-full"
            aria-label="Main navigation"
          >
            <ul className="flex gap-6 justify-start items-center h-full m-0 p-0 list-none">
              {NAV_LINKS.map(({ href, labelKey }) => (
                <li key={labelKey}>
                  <Link
                    href={href}
                    className="text-sm text-gray-700 no-underline transition-colors hover:text-blue-600"
                  >
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4 justify-end h-full">
            <div className="relative h-full flex items-center">
              <LanguageSwitcher />
              <Link
                href={"/cart"}
                className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 bg-white relative cursor-pointer transition-colors hover:bg-gray-100"
                aria-label="Shopping cart"
              >
                <ShoppingCart
                  className="w-5 h-5 text-gray-500"
                  strokeWidth={2}
                />
                <span
                  className={`${
                    isMounted && items.length >= 1 ? "absolute" : "hidden"
                  } -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center leading-none font-medium`}
                >
                  {isMounted ? items.length : 0}
                </span>
              </Link>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 bg-white relative cursor-pointer transition-colors hover:bg-gray-100 ml-1"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
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
        className={`lg:hidden fixed h-screen inset-y-0 right-0 top-16 bg-white z-40 transition-transform duration-300 ease-in-out ${
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
              placeholder={t("header.searchProducts")}
              autoComplete="off"
              className="w-full bg-transparent pl-8 pr-2 min-w-0 border-none h-full text-base focus:outline-none text-gray-900"
            />
          </div>

          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col gap-1 list-none m-0 p-0">
              {NAV_LINKS.map(({ href, labelKey }) => (
                <li key={labelKey}>
                  <Link
                    href={href}
                    className="block p-4 text-lg font-semibold text-gray-700 rounded-lg hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(labelKey)}
                  </Link>
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
