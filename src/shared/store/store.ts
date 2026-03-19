import { configureStore } from "@reduxjs/toolkit";
import { projectApi } from "@/shared/api/projectApi";
import { cartReducer } from "@/entities/cart";
import { testimonialsApi } from "@/shared/api/testimonialApi";
import { productApi } from "../api/productApi";
import { categoryApi } from "../api/categoryApi";

export const store = configureStore({
  reducer: {
    [projectApi.reducerPath]: projectApi.reducer,
    [testimonialsApi.reducerPath]: testimonialsApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    cart: cartReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      projectApi.middleware,
      testimonialsApi.middleware,
      productApi.middleware,
      categoryApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
