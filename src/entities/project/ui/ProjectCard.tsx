"use client";

import { Lang, ProjectTypes } from "@/entities/project/model/types";
import Link from "next/link";
import { useTranslation } from "react-i18next";

function ProjectCard({ project }: { project: ProjectTypes }) {
  const { t, i18n } = useTranslation("common");
  const currentLanguage = i18n.language as Lang;

  const translation = project.translations?.[currentLanguage];
  const title = translation?.title || "";
  const address = translation?.address || "";
  const solution = translation?.solution || "";
  const result = translation?.result || "";

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 my-10 bg-gray-200 rounded-2xl overflow-hidden border border-gray-400 min-h-[500px]`}
    >
      <div
        className={`flex flex-col space-y-4 items-start justify-center p-10`}
      >
        <h3 className="text-3xl font-bold text-red-600">{title}</h3>
        <p className="text-md text-gray-700 font-semibold">
          {t("projects.object")}:{" "}
          <span className="font-normal">{address}</span>
        </p>
        <p className="text-md text-gray-700 font-semibold">
          {t("projects.solution")}:{" "}
          <span className="font-normal">{solution}</span>
        </p>
        <p className="text-md text-gray-700 font-semibold">
          {t("projects.result")}:{" "}
          <span className="font-normal">{result}</span>
        </p>
        <Link
          href={`/projects/${project._id}`}
          className="bg-[#173F5F] text-white rounded-lg py-2 px-6"
        >
          {t("projects.learnMore")}
        </Link>
      </div>
      <div className="h-full">
        {project.images?.[0] ? (
          <img
            src={project.images[0]}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300" />
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
