import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import { UserTypes } from "@/types/RootTypes";

export const UserSlicer = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<UserTypes[], void>({
      query: () => "users",
    }),
  }),
});

export const { useGetUsersQuery } = UserSlicer;
