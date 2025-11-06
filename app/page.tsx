import HeroSection from "@/modules/hero";
import ProductsSection from "@/modules/productsSection";
import ProjectSection from "@/modules/projectsSection";
import ServicesSection from "@/modules/servicesSection";
import React from "react";

function page() {
  return (
    <>
      <HeroSection />
      <ProductsSection />
      <ServicesSection />
      <ProjectSection />
    </>
  );
}

export default page;
