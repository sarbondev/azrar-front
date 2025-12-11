import { Facebook, Instagram, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const icons = [{ label: Instagram }, { label: Send }, { label: Facebook }];

const links = [
  {
    mainTitle: "Разделы",
    routes: [
      { label: "Конфиденциальность", url: "/" },
      { label: "Соглашение", url: "/catalogs" },
      { label: "Оплата и доставка", url: "/about" },
    ],
  },
  {
    mainTitle: "Документы и политика:",
    routes: [
      { label: "+998 (90) 123-45-67", url: "/" },
      { label: "info@engineeringpro.uz", url: "/catalogs" },
      { label: "Ташкент, ул. Амира Темура, 45", url: "/about" },
    ],
  },
  {
    mainTitle: "Контактная информация:",
    routes: [
      { label: "Главная", url: "/" },
      { label: "Каталог товаров", url: "/catalogs" },
      { label: "О компании", url: "/about" },
      { label: "Контакты", url: "/contacts" },
      { label: "Услуги и решения", url: "/services" },
      { label: "Наши работы", url: "/projects" },
    ],
  },
];

function Footer() {
  return (
    <footer className="bg-[#26364A]">
      <div className="container mx-auto p-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10">
          <div className="flex flex-col gap-6">
            <Image src="./logo.svg" width={200} height={100} alt="logo" />
            <p className="text-blue-100/80">
              Надёжные инженерные решения для бизнеса и дома. Комплексные
              системы пожаротушения и видеонаблюдения.
            </p>
            <div className="flex flex-wrap gap-4">
              {icons.map((icon, index) => (
                <div
                  key={index}
                  className="border p-2 border-blue-100 text-white rounded-lg"
                >
                  <icon.label />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap justify-between gap-10">
            {links.map((item, indx) => (
              <ul key={indx} className="text-white">
                <li className="text-lg mb-4">{item.mainTitle}</li>
                {item.routes.map((lnk, ind) => (
                  <li key={ind}>
                    <Link href={lnk.url} className="text-sm opacity-80">
                      {lnk.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto p-6 md:py-10 text-white/80 flex items-center justify-between">
        <p>{new Date().getFullYear()} Azrar Fire System. Все права защищены</p>
        <ul>
          <li>
            Developed by{" "}
            <a href="#" className="underline">
              Sarbondev
            </a>
          </li>
          <li>
            Designed by{" "}
            <a href="#" className="underline">
              Dilshod Egm
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
