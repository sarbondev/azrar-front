import { Lang, ProjectTypes } from "@/types/ProjectTypes";
import Link from "next/link";
import { useTranslation } from "react-i18next";

function ProjectCard({ project }: { project: ProjectTypes }) {
  const { t, i18n } = useTranslation("common");
  const currentLanguage = i18n.language as Lang;

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 my-10 bg-gray-200 rounded-2xl overflow-hidden border border-gray-400 min-h-[500px]`}
    >
      <div
        className={`flex flex-col space-y-4 items-start justify-center p-10`}
      >
        <h1 className="text-3xl font-bold text-red-600">
          {project.translations[currentLanguage].title}
        </h1>
        <h3 className="text-md text-gray-700 font-semibold">
          {t("projects.object")}:{" "}
          <span className="font-normal">
            {project.translations[currentLanguage].address}
          </span>
        </h3>
        <h3 className="text-md text-gray-700 font-semibold">
          {t("projects.solution")}:{" "}
          <span className="font-normal">
            {project.translations[currentLanguage].solution}
          </span>
        </h3>
        <h3 className="text-md text-gray-700 font-semibold">
          {t("projects.result")}:{" "}
          <span className="font-normal">
            {project.translations[currentLanguage].result}
          </span>
        </h3>
        <Link
          href={``}
          className="bg-[#173F5F] text-white rounded-lg py-2 px-6"
        >
          {t("projects.learnMore")}
        </Link>
      </div>
      <div className="h-full">
        <img
          src={project.images[0]}
          alt={project.translations[currentLanguage].title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default ProjectCard;
