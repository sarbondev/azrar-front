import React from "react";
import HeroSection from "@/modules/hero";
import SystemsSection from "@/modules/systemsSection";
import ProjectSection from "@/modules/projectsSection";
import ServicesSection from "@/modules/servicesSection";
import ProductsSection from "@/modules/productsSection";
import HelpSection from "@/modules/helpSection";
import TestimonialsSection from "@/modules/testimonialsSection";

function page() {
  return (
    <>
      <HeroSection />
      <SystemsSection />
      <ServicesSection />
      <ProductsSection />
      <ProjectSection />
      <TestimonialsSection />
      <HelpSection />
    </>
  );
}

export default page;
