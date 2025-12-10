import { RootState } from "@/lib/store/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Ma'lumot turlari
interface LoginPayload {
  email: string;
  parol: string;
}
interface LoginResponse {
  token: string;
  user: { id: string; name: string };
}
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  // baseQuery'ni o'zgartirish (prepareHeaders qo'shish)
  baseQuery: fetchBaseQuery({
    baseUrl: "YOUR_API_BASE_URL", // Asosiy manzil
    prepareHeaders: (headers, { getState }) => {
      // Har bir so'rovga token qo'shish
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // LOGIN (Mutation)
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // GET PROFILE (Query - token yordamida)
    getProfile: builder.query<UserProfile, void>({
      query: () => "auth/profile",
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery } = authApi;
