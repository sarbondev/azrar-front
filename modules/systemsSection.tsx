import React from "react";
import SystemCard from "@/components/SystemCard";
import { System } from "@/types/RootTypes";

const systems: System[] = [
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

export default function systemsSection() {
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
          {systems.map((item, idx) => (
            <SystemCard
              key={item.id}
              system={item}
              isLast={idx === systems.length - 1}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
