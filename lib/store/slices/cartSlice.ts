import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const getInitialState = (): CartItem[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const savedCart = localStorage.getItem("cart");

    const items = savedCart ? JSON.parse(savedCart) : [];
    return items;
  } catch (e) {
    console.error("Savat ma'lumotini yuklashda xato:", e);
    return [];
  }
};

// 3. Helper funksiya: Holat o'zgarganda localStorage'ni yangilash
const updateLocalStorage = (items: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(items));
  }
};

const cartSlice = createSlice({
  name: "cart", // Nomni "cart" ga o'zgartirdik
  initialState: getInitialState(), // Xatosiz initial state

  reducers: {
    // 4. Mahsulot qo'shish yoki miqdorini oshirish
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity || 1;
      } else {
        state.push({ ...newItem, quantity: newItem.quantity || 1 });
      }
      updateLocalStorage(state);
    },

    // 5. Mahsulotni savatdan o'chirish
    removeItem: (state, action: PayloadAction<string>) => {
      state = state.filter((item) => item.id !== action.payload);
      updateLocalStorage(state);
    },

    // 6. Savatni tozalash
    clearCart: (state) => {
      state = [];
      updateLocalStorage(state);
    },
  },
});

// 7. Action creator'lar va reducer'ni eksport qilish
export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
