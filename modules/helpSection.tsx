"use client";
import Link from "next/link";
import React from "react";

const HelpSection = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto mt-20 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 items-center">
        <div className="space-y-4 max-w-[70%]">
          <h1 className="text-3xl font-bold text-gray-800">
            Мы рядом, чтобы <br />
            <span className="text-red-600">помочь вам</span>
          </h1>
          <p>
            Оставьте заявку или свяжитесь с нами любым удобным способом. Наши
            инженеры проконсультируют, помогут подобрать оборудование и
            рассчитают стоимость проекта под ваши задачи.
          </p>
          <Link
            href={"/"}
            className="py-3 px-3 sm:px-4 bg-[#173F5F] text-white font-medium text-sm rounded-lg lg:min-w-[120px] cursor-pointer transition-colors border-none hover:bg-[#122f44]"
          >
            Связаться с нами
          </Link>
        </div>
        <div className="flex items-center justify-center h-full">
          <img
            className="rounded-2xl"
            src="https://www.escapeworksdenver.com/wp-content/uploads/The-Importance-Of-Team-Building-For-Your-Company.jpg  "
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
