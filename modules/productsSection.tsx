"use client";

import React, { useState, memo } from "react";
import { ArrowRight } from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string;
  image?: string;
}

const products: Product[] = [
  {
    id: "cameras",
    title: "Системы видеонаблюдения",
    description:
      "Камеры, видеорегистраторы и аксессуары для полного визуального контроля.",
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop",
  },
  {
    id: "doorbell",
    title: "Умные дверные звонки",
    description:
      "Современные видеодомофоны с поддержкой WiFi и облачного хранения.",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop",
  },
  {
    id: "all",
    title: "Все товары",
    description: "",
  },
  {
    id: "compact",
    title: "Компактные камеры",
    description:
      "Миниатюрные камеры для скрытого наблюдения и небольших помещений.",
    image:
      "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&auto=format&fit=crop",
  },
  {
    id: "sensors",
    title: "Датчики дыма и безопасности",
    description:
      "Датчики дыма, утечки газа и другие системы раннего оповещения.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
  },
];

const ProductCard = memo(function ProductCard({
  product,
  isLast,
}: {
  product: Product;
  isLast?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  if (product.id === "all") {
    return (
      <div className="rounded-3xl bg-[#2c4a5e] flex items-center justify-center h-full hover:shadow-xl hover:bg-[#1f3747] transition-all duration-300 cursor-pointer select-none min-h-[280px]">
        <div className="text-center px-6">
          <p className="text-white text-xl md:text-3xl font-bold flex items-center gap-3 justify-center">
            Все товары <ArrowRight className="w-6 md:w-8 h-6 md:h-8" />
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-3xl bg-[#e8ecf0] hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden group h-full min-h-[280px] ${
        isLast ? "md:col-span-2" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
    >
      <div className="absolute inset-0 z-0">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className={`object-cover w-full h-full transition-all duration-500${
              isHovered ? " scale-110 blur-sm" : " scale-100"
            }`}
            draggable={false}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200" />
        )}
      </div>

      <div className="absolute inset-0 z-5 bg-linear-to-t from-black/30 via-transparent to-transparent" />

      <div
        className={`absolute bottom-0 left-0 right-0 z-10 transition-all duration-300 p-4 md:p-6${
          isHovered ? " translate-y-0 opacity-100" : " translate-y-4 opacity-0"
        }`}
      >
        <div className="w-full rounded-2xl bg-white/95 shadow-2xl px-5 py-5 md:px-7 md:py-6 border border-white/20 backdrop-blur-xl">
          <div className="text-left">
            <h3 className="text-xl md:text-2xl font-bold text-[#de1b38] mb-2">
              {product.title}
            </h3>
            <p className="text-gray-700 font-normal text-sm md:text-base leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
ProductCard.displayName = "ProductCard";

export default function ProductsSection() {
  return (
    <main className="min-h-screen bg-white p-4 md:p-8">
      <div className="container mx-auto max-w-7xl">
        <header className="mb-10 md:mb-14">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2 leading-tight">
            Выберите <span className="text-[#de1b38]">подходящую</span>
            <br />
            систему для вашего объекта
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 auto-rows-fr">
          {products.map((item, idx) => (
            <ProductCard
              key={item.id}
              product={item}
              isLast={idx === products.length - 1}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
