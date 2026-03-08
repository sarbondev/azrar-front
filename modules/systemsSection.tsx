"use client";

import React from "react";
import SystemCard from "@/components/SystemCard";
import { SystemTypes } from "@/types/OldTypes";
import { useClientTranslation } from "@/hooks/useClientTranslation"; // ✅

const SYSTEMS_RAW: SystemTypes[] = [
  {
    id: "cameras",
    title: "cameras",
    description: "cameras",
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop",
  },
  {
    id: "doorbell",
    title: "doorbell",
    description: "doorbell",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop",
  },
  {
    id: "all",
    title: "all",
    description: "",
  },
  {
    id: "compact",
    title: "compact",
    description: "compact",
    image:
      "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&auto=format&fit=crop",
  },
  {
    id: "sensors",
    title: "sensors",
    description: "sensors",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
  },
];

export default function SystemsSection() {
  const { t, isMounted } = useClientTranslation("common"); // ✅

  const translatedSystems = SYSTEMS_RAW.map((system) => ({
    ...system,
    title: t(`systems.items.${system.title}.title`),
    description: t(`systems.items.${system.title}.description`),
  }));

  if (!isMounted) {
    // ✅ skeleton
    return (
      <main className="min-h-screen bg-white p-4 md:p-8 animate-pulse">
        <div className="container mx-auto">
          <div className="mb-10 md:mb-14 space-y-3">
            <div className="h-10 bg-gray-200 rounded w-3/4" />
            <div className="h-10 bg-gray-200 rounded w-1/2" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-2xl" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white p-4 md:p-8">
      <div className="container mx-auto">
        <header className="mb-10 md:mb-14">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2 leading-tight">
            {t("systems.title.part1")}{" "}
            <span className="text-[#de1b38]">{t("systems.title.part2")}</span>
            <br />
            {t("systems.title.part3")}
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 auto-rows-fr">
          {translatedSystems.map((item, idx) => (
            <SystemCard
              key={item.id}
              system={item}
              isLast={idx === translatedSystems.length - 1}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
