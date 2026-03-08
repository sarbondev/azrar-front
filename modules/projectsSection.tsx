"use client";

import React from "react";
import ProjectCard from "@/components/ProjectCard";
import { ProjectTypes } from "@/types/OldTypes";
import { useClientTranslation } from "@/hooks/useClientTranslation"; // ✅

const RAW_PROJECTS = [
  {
    id: 0,
    key: "technoPlant",
    image:
      "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=1200&q=80",
  },
  {
    id: 1,
    key: "goldenTower",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80",
  },
  {
    id: 2,
    key: "businessCity",
    image:
      "https://www1.bca.gov.sg/images/default-source/buildsg-magazine/2020/safer-and-more-accessible-buildings-with-new-building-control-act-changes/safer-and-more-accessible-buildings-with-new-building-control-act-changes.jpg?sfvrsn=a2f0a29f_2",
  },
];

const ProjectSection = () => {
  const { t, isMounted } = useClientTranslation("common"); // ✅

  if (!isMounted) {
    // ✅ skeleton
    return (
      <div className="min-h-screen animate-pulse">
        <div className="container mx-auto mt-24 mb-10 px-4 sm:px-6 lg:px-8">
          <div className="h-12 bg-gray-200 rounded w-2/3" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const projects: ProjectTypes[] = RAW_PROJECTS.map((p) => ({
    // ✅ isMounted dan keyin
    id: p.id,
    image: p.image,
    title: t(`projects.items.${p.key}.title`),
    object: t(`projects.items.${p.key}.object`),
    solution: t(`projects.items.${p.key}.solution`),
    result: t(`projects.items.${p.key}.result`),
  }));

  return (
    <div className="min-h-screen">
      <div className="container mx-auto mt-24 mb-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          {t("projects.title")}{" "}
          <span className="text-red-600">{t("projects.subtitle")}</span>
        </h1>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
