import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Страница не найдена — Azrar",
};

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <div className="max-w-md w-full text-center">
        <div className="text-[#173F5F] text-8xl font-extrabold mb-4 animate-bounce">
          404
        </div>
        <h1 className="text-2xl font-semibold mb-2">Страница не найдена</h1>
        <p className="text-gray-600 mb-6">
          Извините, но запрашиваемая страница не существует или была удалена.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#173F5F] hover:bg-[#1a6b84] text-white py-2 px-6 rounded-md transition"
        >
          На главную
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
