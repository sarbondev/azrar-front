"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useClientTranslation } from "@/hooks/useClientTranslation";

const RAW_TESTIMONIALS = [
  {
    id: 1,
    key: "timur",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
  },
  {
    id: 2,
    key: "rustam",
    image:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=600&h=600&fit=crop",
  },
  {
    id: 3,
    key: "aziza",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop",
  },
  {
    id: 4,
    key: "shohruh",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=600&fit=crop",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const { t, isMounted } = useClientTranslation("common");

  const testimonials = isMounted
    ? RAW_TESTIMONIALS.map((item) => ({
        ...item,
        name: t(`testimonials.items.${item.key}.name`),
        username: t(`testimonials.items.${item.key}.username`),
        quote: t(`testimonials.items.${item.key}.quote`),
      }))
    : RAW_TESTIMONIALS.map((item) => ({
        ...item,
        name: "",
        username: "",
        quote: "",
      }));

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [currentIndex]);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => nextSlide(), 5000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  const goToSlide = (index: number) => setCurrentIndex(index);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    stopAutoPlay();
    setIsDragging(true);
    setStartX("touches" in e ? e.touches[0].clientX : e.clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    setTranslateX(("touches" in e ? e.touches[0].clientX : e.clientX) - startX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (translateX > 50) prevSlide();
    else if (translateX < -50) nextSlide();
    setTranslateX(0);
    startAutoPlay();
  };

  if (!isMounted) {
    return (
      <section className="py-16 px-4 animate-pulse">
        <div className="container mx-auto">
          <div className="mb-12 space-y-3">
            <div className="h-12 bg-gray-200 rounded w-2/3" />
            <div className="h-5 bg-gray-200 rounded w-1/2" />
          </div>
          <div className="h-80 bg-gray-200 rounded-3xl max-w-4xl mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              {t("testimonials.title")}{" "}
              <span className="text-red-600">
                {t("testimonials.titleHighlight")}
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-xl">
              {t("testimonials.subtitle")}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                prevSlide();
                stopAutoPlay();
                startAutoPlay();
              }}
              className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-red-600 hover:bg-red-50 transition-all duration-300 flex items-center justify-center group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-red-600 transition-colors" />
            </button>
            <button
              onClick={() => {
                nextSlide();
                stopAutoPlay();
                startAutoPlay();
              }}
              className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-red-600 hover:bg-red-50 transition-all duration-300 flex items-center justify-center group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-red-600 transition-colors" />
            </button>
          </div>
        </div>

        <div
          className="relative overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="shrink-0 w-full px-2">
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 max-w-4xl mx-auto">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 relative h-64 md:h-auto">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        draggable="false"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                      <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                        <span className="text-sm font-medium text-gray-800">
                          {testimonial.username}
                        </span>
                      </div>
                    </div>

                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-slate-800 text-white">
                      <svg
                        className="w-12 h-12 mb-6 opacity-30"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                      >
                        <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z" />
                      </svg>
                      <p className="text-lg md:text-xl leading-relaxed mb-8 font-light">
                        &quot;{testimonial.quote}&quot;
                      </p>
                      <div>
                        <h3 className="text-2xl font-bold">
                          {testimonial.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                goToSlide(idx);
                stopAutoPlay();
                startAutoPlay();
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-8 bg-red-600"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-4">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-600 transition-all duration-100 ease-linear"
              style={{
                width: `${((currentIndex + 1) / testimonials.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
