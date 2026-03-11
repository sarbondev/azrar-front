"use client";

import { useClientTranslation } from "@/hooks/useClientTranslation";
import React, { useState, useEffect, useRef } from "react";

const EngineeringServices = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionsRef = useRef<Array<HTMLDivElement | null>>([]);
  const { t, isMounted } = useClientTranslation("common");

  const services = isMounted
    ? [
        {
          id: 0,
          title: t("services.items.design.title"),
          description: t("services.items.design.description"),
          bgColor: "#2c3e50",
          image:
            "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=1200&q=80",
        },
        {
          id: 1,
          title: t("services.items.installation.title"),
          description: t("services.items.installation.description"),
          bgColor: "#34495e",
          image:
            "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80",
        },
        {
          id: 2,
          title: t("services.items.maintenance.title"),
          description: t("services.items.maintenance.description"),
          bgColor: "#1a252f",
          image:
            "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80",
        },
      ]
    : [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRef.current.indexOf(
              entry.target as HTMLDivElement,
            );
            if (index !== -1) {
              setActiveSection(index);
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-25% 0px -25% 0px",
      },
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // ✅ Mount bo'lgunicha skeleton ko'rsat
  if (!isMounted) {
    return (
      <div className="min-h-screen p-6 animate-pulse">
        <div className="container mx-auto mt-24 mb-10">
          <div className="h-12 bg-gray-200 rounded w-2/3 mb-4" />
        </div>
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-40 bg-gray-200 rounded-3xl" />
              ))}
            </div>
            <div className="h-[500px] bg-gray-200 rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto mt-24 mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          {t("services.fullCycleTitle1")}{" "}
          <span className="text-red-600">
            {t("services.fullCycleHighlight")}
          </span>
          <br />
          {t("services.fullCycleTitle2")}
        </h1>
      </div>

      <div className="relative transition-colors duration-700">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="space-y-6 sm:space-y-8">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  ref={(el) => {
                    sectionsRef.current[index] = el;
                  }}
                  className={`transition-all duration-500 ${
                    activeSection === index ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <div
                    className={`rounded-3xl p-6 sm:p-8 transition-all duration-500 ${
                      activeSection === index
                        ? "bg-gray-800 scale-100"
                        : "bg-transparent scale-95"
                    }`}
                  >
                    <h3
                      className={`text-xl sm:text-2xl lg:text-3xl font-bold ${
                        activeSection === index ? "text-white" : ""
                      } mb-4`}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`text-sm sm:text-base lg:text-lg ${
                        activeSection === index ? "text-gray-200" : ""
                      } leading-relaxed`}
                    >
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:sticky lg:top-24">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] sm:h-[500px] lg:h-[600px]">
                {services.map((service, index) => (
                  <img
                    key={service.id}
                    src={service.image}
                    alt={service.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                      activeSection === index ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="container mx-auto text-center">
          <p className="text-lg sm:text-xl text-gray-700 mb-8">
            {t("services.helpText")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-colors text-sm sm:text-base">
              {t("services.learnMore")}
            </button>
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-900 transition-all shadow-lg text-sm sm:text-base">
              {t("services.requestQuote")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineeringServices;
