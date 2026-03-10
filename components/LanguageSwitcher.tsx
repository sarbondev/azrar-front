"use client";

import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const LANGUAGES = [
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const current = mounted
    ? (LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0])
    : LANGUAGES[0];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="relative mr-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700 cursor-pointer"
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{
            background: mounted
              ? current.code === "uz"
                ? "#1DC45A"
                : "#005BFF"
              : "#1DC45A",
          }}
        />
        {mounted ? current.label : "UZ"}
        <svg
          className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && mounted && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-11 z-50 w-24 bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer
                  ${
                    i18n.language === lang.code
                      ? "bg-[#173F5F] text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    background: lang.code === "uz" ? "#1DC45A" : "#005BFF",
                  }}
                />
                {lang.label}
                {i18n.language === lang.code && (
                  <svg
                    className="w-3.5 h-3.5 ml-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
