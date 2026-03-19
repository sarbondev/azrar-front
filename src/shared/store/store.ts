import { configureStore } from "@reduxjs/toolkit";
import { projectApi } from "@/shared/api/projectApi";
import { cartReducer } from "@/entities/cart";
import { testimonialsApi } from "@/shared/api/testimonialApi";

export const store = configureStore({
  reducer: {
    [projectApi.reducerPath]: projectApi.reducer,
    [testimonialsApi.reducerPath]: testimonialsApi.reducer,
    cart: cartReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      projectApi.middleware,
      testimonialsApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
