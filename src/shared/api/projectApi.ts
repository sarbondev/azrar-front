import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/shared/config";
import { ProjectTypes } from "@/entities/project/model/types";

export interface ProjectsResponseData {
  projects: ProjectTypes[];
  total: number;
}

export interface ProjectsResponse {
  data: ProjectsResponseData;
  message: string;
}

export interface ProjectDetailResponse {
  project: ProjectTypes;
  message: string;
}

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({  
    getProjects: builder.query<ProjectsResponse, Record<string, string> | void>(
      {
        query: (params) => ({
          url: "/projects",
          params: params ?? {},
        }),
      },
    ),
    getProjectById: builder.query<ProjectDetailResponse, string>({
      query: (id) => `/projects/${id}`,
    }),
  }),
});

export const { useGetProjectByIdQuery, useGetProjectsQuery } = projectApi;
