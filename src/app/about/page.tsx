"use client";

import React from "react";
import { useClientTranslation } from "@/shared/i18n";

export default function AboutPage() {
  const { t, isMounted } = useClientTranslation("common");

  if (!isMounted) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen animate-pulse">
        <div className="h-12 bg-gray-200 rounded w-1/2 mb-6" />
        <div className="h-5 bg-gray-200 rounded w-3/4" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
        {t("about.title")}
      </h1>
      <p className="text-gray-600 text-lg">
        {t("about.description")}
      </p>
    </div>
  );
}
