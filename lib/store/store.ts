import { configureStore } from "@reduxjs/toolkit";
import { UserSlicer } from "./userSlice";

export const store = configureStore({
  reducer: {
    [UserSlicer.reducerPath]: UserSlicer.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserSlicer.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
