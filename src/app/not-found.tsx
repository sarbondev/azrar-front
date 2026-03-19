import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <div className="max-w-md w-full text-center">
        <div className="text-[#173F5F] text-8xl font-extrabold mb-4 animate-bounce">
          404
        </div>
        <h1 className="text-2xl font-semibold mb-2">
          Sahifa topilmadi
        </h1>
        <p className="text-gray-600 mb-6">
          Siz izlayotgan sahifa mavjud emas yoki ko&apos;chirilgan
        </p>
        <Link
          href="/"
          className="inline-block bg-[#173F5F] hover:bg-[#1a6b84] text-white py-2 px-6 rounded-md transition"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  );
}
