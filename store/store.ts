import { configureStore } from "@reduxjs/toolkit";
import { projectApi } from "@/services/projects";
import cartReducer from "@/store/slices/cartSlice";

export const store = configureStore({
  reducer: {
    [projectApi.reducerPath]: projectApi.reducer,
    cart: cartReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(projectApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
