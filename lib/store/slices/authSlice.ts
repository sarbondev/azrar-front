import { UserTypes } from "@/types/RootTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  user: UserTypes | null; // YANGI: Foydalanuvchi obyekti
  isLoggedIn: boolean;
}

// Local Storage'dan ma'lumotlarni xavfsiz yuklash funksiyasi
const loadInitialState = (): AuthState => {
  if (typeof window === "undefined") {
    return { token: null, user: null, isLoggedIn: false };
  }

  const token = localStorage.getItem("azrarToken");
  const userString = localStorage.getItem("azrarUser"); // YANGI: Userni yuklash

  let user = null;
  try {
    user = userString ? JSON.parse(userString) : null;
  } catch (e) {
    console.error("User ma'lumotini yuklashda xato:", e);
  }

  return {
    token: token,
    user: user,
    isLoggedIn: !!token && !!user, // Ikkala ma'lumot ham borligini tekshirish
  };
};

const initialState: AuthState = loadInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 2. setCredentials action'ini yangilash: token va user obyekti kerak
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: UserTypes }> // Payloadni o'zgartirdik
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user; // Foydalanuvchini saqlash
      state.isLoggedIn = true;

      // Local Storage'ga ikkalasini ham saqlash
      localStorage.setItem("azrarToken", action.payload.token);
      localStorage.setItem("azrarUser", JSON.stringify(action.payload.user)); // YANGI
    },

    // 3. logOut action'ini yangilash
    logOut: (state) => {
      state.token = null;
      state.user = null; // Userni tozalash
      state.isLoggedIn = false;

      localStorage.removeItem("azrarToken");
      localStorage.removeItem("azrarUser"); // YANGI: Userni o'chirish
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
