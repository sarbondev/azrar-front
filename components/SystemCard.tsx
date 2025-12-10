"use client";

import { SystemTypes } from "@/types/RootTypes";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";

function SystemCard({
  system,
  isLast,
}: {
  system: SystemTypes;
  isLast?: boolean;
}) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  if (system.id === "all") {
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
        {system.image ? (
          <img
            src={system.image}
            alt={system.title}
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
              {system.title}
            </h3>
            <p className="text-gray-700 font-normal text-sm md:text-base leading-relaxed">
              {system.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemCard;
