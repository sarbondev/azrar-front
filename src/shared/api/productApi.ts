import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/shared/config";
import { ProductTypes } from "@/entities/product";

export interface ProductsResponseData {
  products: ProductTypes[];
  total: number;
}

export interface ProductsResponse {
  data: ProductsResponseData;
  message: string;
}

export interface ProductDetailResponse {
  product: ProductTypes;
  message: string;
}

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      ProductsResponse,
      Record<string, string> | undefined
    >({
      query: (params) => {
        if (!params || Object.keys(params).length === 0) {
          return "/products";
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
        return `/products${queryString ? `?${queryString}` : ""}`;
      },
    }),
    getProductById: builder.query<ProductDetailResponse, string>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetProductByIdQuery, useGetProductsQuery } = productApi;
