import React from "react";
import ProjectCard from "@/components/ProjectCard";
import { ProjectTypes } from "@/types/RootTypes";

const ProjectSection = () => {
  const projects: ProjectTypes[] = [
    {
      id: 0,
      title: "Производственный комплекс «TechnoPlant»",
      object: "Промышленное предприятие, Ташкент",
      solution: "Система видеонаблюдения и пожарной сигнализации",
      result: "Полное покрытие территории, круглосуточный контроль",
      image:
        "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=1200&q=80",
    },
    {
      id: 1,
      title: "Жилой комплекс «Golden Tower»",
      object: "Многоэтажный жилой дом, Ташкент",
      solution: "Установка домофонов и камер на парковке",
      result: "Повышение безопасности жильцов и имущества",
      image:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80",
    },
    {
      id: 2,
      title: "Офисный центр «Business City»",
      object: "Коммерческая недвижимость, Ташкент",
      solution: "Интегрированная система СКУД и пожарных датчиков",
      result: "Автоматизация доступа и соответствие нормам безопасности",
      image:
        "https://www1.bca.gov.sg/images/default-source/buildsg-magazine/2020/safer-and-more-accessible-buildings-with-new-building-control-act-changes/safer-and-more-accessible-buildings-with-new-building-control-act-changes.jpg?sfvrsn=a2f0a29f_2",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto mt-24 mb-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          Проекты, которым <span className="text-red-600">доверяют</span>
          <br />
          компании по всей стране
        </h1>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
