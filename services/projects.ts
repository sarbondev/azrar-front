import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { API_URL } from "@/lib/config";
import { ProjectTypes } from "@/types/ProjectTypes";

export interface ProjectResponseTypes {
  projects: ProjectTypes[];
  total: number;
}

export interface ProjectResponseTypes {
  data: ProjectResponseTypes;
  message: string;
}

export interface ProjectDetailDataTypes {
  project: ProjectTypes;
  message: string;
}

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState() as RootState;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProjects: builder.query<
      ProjectResponseTypes,
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
    getProjectById: builder.query<ProjectDetailDataTypes, string>({
      query: (id) => `/projects/${id}`,
    }),
  }),
});

export const { useGetProjectByIdQuery, useGetProjectsQuery } = projectApi;
