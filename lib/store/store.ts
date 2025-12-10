import { authApi } from "@/services/userApi";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/lib/store/slices/authSlice";
import cartReducer from "@/lib/store/slices/cartSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
