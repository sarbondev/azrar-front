"use client";
import React from "react";

interface ProjectTypes {
  id: number;
  title: string;
  object: string;
  solution: string;
  result: string;
  image: string;
}

function ProjectCard({ project }: { project: ProjectTypes }) {
  const isReversed = project.id % 2 !== 0;

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 my-10 bg-gray-200 rounded-2xl overflow-hidden border border-gray-400 ${
        isReversed ? "md:grid-cols-[2fr_1fr]" : "md:grid-cols-[1fr_2fr]"
      }`}
    >
      {isReversed && (
        <div className="order-2 md:order-1 flex items-center justify-center h-full">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      <div
        className={`flex flex-col space-y-2 justify-center p-4 ${
          isReversed ? "order-1 md:order-2" : "order-1"
        }`}
      >
        <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
        <h3 className="text-lg text-gray-700 font-semibold">
          Объект: <span className="font-normal">{project.object}</span>
        </h3>
        <h3 className="text-lg text-gray-700 font-semibold">
          Решение: <span className="font-normal">{project.solution}</span>
        </h3>
        <h3 className="text-lg text-gray-700 font-semibold">
          Результат: <span className="font-normal">{project.result}</span>
        </h3>
      </div>

      {!isReversed && (
        <div className="order-2 flex items-center justify-center h-full">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto object-cover"
          />
        </div>
      )}
    </div>
  );
}

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
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
