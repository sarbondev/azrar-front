import React from "react";
import { ProductTypes } from "@/types/RootTypes";
import ProductCard from "@/components/ProductCard";

const products: ProductTypes[] = [
  {
    title: "Компактные камеры",
    price: 1280000,
    category: "IP камера",
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop",
  },
  {
    title: "Компактные камеры",
    price: 1280000,
    category: "IP камера",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop",
  },
  {
    title: "Компактные камеры",
    price: 1280000,
    category: "IP камера",
    image:
      "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&auto=format&fit=crop",
  },
  {
    title: "Компактные камеры",
    price: 1280000,
    category: "IP камера",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
  },
];

export default function productsSection() {
  return (
    <main className="min-h-screen bg-white p-4 md:p-8">
      <div className="container mx-auto">
        <header className="mb-10 md:mb-14">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2 leading-tight">
            Лучшие <span className="text-[#de1b38]">предложения</span>
            <br />
            для вашего объекта
          </h1>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {products.map((item, idx) => (
            <ProductCard key={idx} product={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
