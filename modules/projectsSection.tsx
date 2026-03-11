"use client";

import React from "react";
import { useClientTranslation } from "@/hooks/useClientTranslation";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useGetProjectsQuery } from "@/services/projects";
import { ProjectList } from "@/components/projectComponents/ProjectList";

const ProjectSection = () => {
  const { t, isMounted } = useClientTranslation("common");

  const { queryParams } = useQueryParams();

  const {
    data: response,
    isFetching,
    isError,
    isLoading,
  } = useGetProjectsQuery(queryParams);

  const { projects, total } = response?.data || {
    projects: [],
    total: 0,
  };

  if (!isMounted || isLoading || isFetching) {
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

  console.log(projects);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto mt-24 mb-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          {t("projects.title")}{" "}
          <span className="text-red-600">{t("projects.subtitle")}</span>
        </h1>
      </div>
      <ProjectList projects={projects} total={total} />
    </div>
  );
};

export default ProjectSection;
