import { ProjectTypes } from "@/types/ProjectTypes";
import React from "react";
import ProjectCard from "./ProjectCard";

export const ProjectList = ({
  projects,
  total,
}: {
  projects: ProjectTypes[];
  total: number;
}) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
};
