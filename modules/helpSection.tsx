"use client";

import Link from "next/link";
import React from "react";
import { useClientTranslation } from "@/hooks/useClientTranslation"; // ✅

const HelpSection = () => {
  const { t, isMounted } = useClientTranslation("common"); // ✅

  if (!isMounted) {
    return (
      <div className="container mx-auto mt-20 mb-40 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 items-center animate-pulse">
        <div className="space-y-4 max-w-[70%]">
          <div className="h-10 bg-gray-200 rounded w-3/4" />
          <div className="h-10 bg-gray-200 rounded w-1/2" />
          <div className="h-5 bg-gray-200 rounded w-full" />
          <div className="h-10 bg-gray-200 rounded w-32" />
        </div>
        <div className="h-64 bg-gray-200 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-20 mb-40 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 items-center">
      <div className="space-y-4 max-w-[70%]">
        <h1 className="text-3xl font-bold text-gray-800">
          {t("help.title")} <br />
          <span className="text-red-600">{t("help.subtitle")}</span>
        </h1>
        <p>{t("help.description")}</p>
        <Link
          href={"/"}
          className="py-3 px-3 sm:px-4 bg-[#173F5F] text-white font-medium text-sm rounded-lg lg:min-w-[120px] cursor-pointer transition-colors border-none hover:bg-[#122f44]"
        >
          {t("help.contactUs")}
        </Link>
      </div>
      <div className="flex items-center justify-center h-full">
        <img
          className="rounded-2xl"
          src="https://www.escapeworksdenver.com/wp-content/uploads/The-Importance-Of-Team-Building-For-Your-Company.jpg"
          alt="Team building"
        />
      </div>
    </div>
  );
};

export default HelpSection;
