"use client";

import { Facebook, Instagram, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useClientTranslation } from "@/hooks/useClientTranslation"; // ✅

const icons = [{ label: Instagram }, { label: Send }, { label: Facebook }];

const RAW_LINKS = [
  {
    sectionKey: "documents",
    routes: [
      { linkKey: "privacy", url: "/" },
      { linkKey: "agreement", url: "/catalogs" },
      { linkKey: "payment", url: "/about" },
    ],
  },
  {
    sectionKey: "policy",
    routes: [
      { linkKey: "phone", url: "/" },
      { linkKey: "email", url: "/catalogs" },
      { linkKey: "address", url: "/about" },
    ],
  },
  {
    sectionKey: "contact",
    routes: [
      { linkKey: "home", url: "/" },
      { linkKey: "catalog", url: "/catalogs" },
      { linkKey: "about", url: "/about" },
      { linkKey: "contacts", url: "/contacts" },
      { linkKey: "services", url: "/services" },
      { linkKey: "projects", url: "/projects" },
    ],
  },
];

function Footer() {
  const { t, isMounted } = useClientTranslation("common"); // ✅

  const links = isMounted
    ? RAW_LINKS.map((section) => ({
        mainTitle: t(`footer.sections.${section.sectionKey}.title`),
        routes: section.routes.map((route) => ({
          label: t(
            `footer.sections.${section.sectionKey}.links.${route.linkKey}`,
          ),
          url: route.url,
        })),
      }))
    : RAW_LINKS.map((section) => ({
        mainTitle: "",
        routes: section.routes.map((route) => ({ label: "", url: route.url })),
      }));

  return (
    <footer className="bg-[#26364A]">
      <div className="container mx-auto p-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10">
          <div className="flex flex-col gap-6">
            <Image src="./logo.svg" width={200} height={100} alt="logo" />
            <p className="text-blue-100/80">
              {isMounted ? t("footer.description") : ""}
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
        <p>
          {new Date().getFullYear()} Azrar Fire System.{" "}
          {isMounted ? t("footer.copyright") : ""}
        </p>
        <ul>
          <li>
            {isMounted ? t("footer.developedBy") : ""}{" "}
            <a href="#" className="underline">
              Sarbondev
            </a>
          </li>
          <li>
            {isMounted ? t("footer.designedBy") : ""}{" "}
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
