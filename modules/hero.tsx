import { ArrowRight, Compass } from "lucide-react";
import Link from "next/link";
import React from "react";

const ENGINEER_IMAGE_PLACEHOLDER = "./heroim.png";

function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-32 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 relative z-10">
        <div className="w-full">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Инженерия <span className="text-red-600">безопасности.</span>
            <br />
            От идеи до реализации.
          </h1>

          <p className="text-base text-gray-600 mb-8 max-w-lg">
            Проектирование, поставка и монтаж систем безопасности и
            автоматизации по стандартам промышленного уровня.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={"/"}
              className="px-6 py-3 bg-[#173F5F] text-white font-medium text-base rounded-lg shadow-lg hover:bg-[#122f44] transition-colors flex items-center justify-center min-w-[190px] gap-2"
            >
              Вызвать инженера <ArrowRight size={14} />
            </Link>

            <Link
              href={"/catalog"}
              className="px-6 py-3 text-[#173F5F] font-medium text-base rounded-lg border border-[#173F5F] bg-white hover:bg-gray-50 transition-colors flex items-center justify-center min-w-[190px]"
            >
              Перейти в каталог
            </Link>
          </div>
        </div>

        <div className="relative w-full h-[450px] sm:h-[550px] lg:h-[650px] flex justify-center lg:justify-end">
          <div className="absolute w-[85%] h-full rounded-[20px] overflow-hidden shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
            <img
              src={ENGINEER_IMAGE_PLACEHOLDER}
              alt="An engineer installs security equipment on a ceiling."
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute -top-5 -right-5 lg:-right-10 z-20">
            <button className="w-24 h-24 bg-red-500 border border-white rounded-2xl shadow-2xl shadow-red-500 flex items-center justify-center p-3 transform transition-transform duration-300 hover:scale-105">
              <Compass className="w-14 h-14 text-white" />
            </button>
          </div>

          <div className="absolute -bottom-10 left-0 lg:left-[0%] w-full sm:w-[350px] p-6 bg-white rounded-lg border border-gray-300 z-30 transform -translate-y-1/2">
            <p className="text-sm font-medium text-gray-700">
              От проектирования до пусконаладки –{" "}
              <br className="hidden sm:inline" /> все инженерные процессы в
              одних руках
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
