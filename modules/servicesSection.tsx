"use client";

import React, { useState, useEffect, useRef } from "react";

const EngineeringServices = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionsRef = useRef<Array<HTMLDivElement | null>>([]);

  const services = [
    {
      id: 0,
      title: "Проектирование систем",
      description:
        "Разрабатываем детальные инженерные проекты с учётом всех норм, стандартов и особенностей объекта. Наши специалисты создают оптимальные решения для систем видеонаблюдения, пожарной сигнализации, пожаротушения и других инженерных сетей.",
      bgColor: "#2c3e50",
      image:
        "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=1200&q=80",
    },
    {
      id: 1,
      title: "Монтаж и пусконаладка",
      description:
        "Выполняем профессиональный монтаж, подключение и настройку оборудования с последующей пусконаладкой. Мы используем только сертифицированные материалы и инструменты, а все работы выполняются под контролем опытных инженеров.",
      bgColor: "#34495e",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80",
    },
    {
      id: 2,
      title: "Техническое обслуживание",
      description:
        "Обеспечиваем регулярное сервисное обслуживание, диагностику и профилактику систем безопасности. Наши инженеры следят за стабильной работой оборудования, устраняют неисправности и проводят плановые проверки.",
      bgColor: "#1a252f",
      image:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRef.current.indexOf(
              entry.target as HTMLDivElement
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
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto mt-24 mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          Мы реализуем <span className="text-red-600">полный цикл</span>
          <br />
          инженерных работ
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
            Мы поможем подобрать оптимальное решение под ваш объект.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-colors text-sm sm:text-base">
              Подробнее
            </button>
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-900 transition-all shadow-lg text-sm sm:text-base">
              Запросить КП
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineeringServices;
