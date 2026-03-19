import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/shared/config";
import { CategoryTypes } from "../types/category";

export interface CategoriesResponseData {
  categories: CategoryTypes[];
  total: number;
}

export interface CategoriesResponse {
  data: CategoriesResponseData;
  message: string;
}

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getAllCategories: builder.query<CategoriesResponse, void>({
      query: () => "/categories",
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoryApi;
