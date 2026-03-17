import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/lib/config";
import { TestimonialTypes } from "@/types/TestimonialsTypes";

export interface TestimonialsData {
  testimonials: TestimonialTypes[];
  total: number;
}

export interface TestimonialsResponse {
  data: TestimonialsData;
  message: string;
}

export const testimonialsApi = createApi({
  reducerPath: "testimonialsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getTestimonials: builder.query<TestimonialsResponse, void>({
      query: () => "/testimonials",
    }),
  }),
});

export const { useGetTestimonialsQuery } = testimonialsApi;
