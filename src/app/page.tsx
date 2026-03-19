export const dynamic = "force-dynamic";

import React from "react";
import { HeroSection } from "@/widgets/sections/hero";
import { SystemsSection } from "@/widgets/sections/systems";
import { ProjectsSection } from "@/widgets/sections/projects";
import { ServicesSection } from "@/widgets/sections/services";
import { ProductsSection } from "@/widgets/sections/products";
import { HelpSection } from "@/widgets/sections/help";
import { TestimonialsSection } from "@/widgets/sections/testimonials";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SystemsSection />
      <ServicesSection />
      <ProductsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <HelpSection />
    </>
  );
}
