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
    getProjects: builder.query<
      ProjectsResponse,
      Record<string, string> | undefined
    >({
      query: (params) => {
        if (!params || Object.keys(params).length === 0) {
          return "/projects";
        }
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value) {
            if (value.includes(",")) {
              const values = value
                .split(",")
                .map((v) => v.trim())
                .filter(Boolean);
              values.forEach((val) => {
                searchParams.append(key, val);
              });
            } else {
              searchParams.append(key, value);
            }
          }
        });
        const queryString = searchParams.toString();
        return `/projects${queryString ? `?${queryString}` : ""}`;
      },
    }),
    getProjectById: builder.query<ProjectDetailResponse, string>({
      query: (id) => `/projects/${id}`,
    }),
  }),
});

export const { useGetProjectByIdQuery, useGetProjectsQuery } = projectApi;
