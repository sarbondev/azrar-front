import { ProductTypes } from "@/entities/product/model/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem extends Omit<ProductTypes, "quantity"> {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const CART_STORAGE_KEY = "shopping_cart";

const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};

const saveCartToStorage = (items: CartItem[]) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 0),
    0,
  );
  return { totalItems, totalPrice };
};

const initialItems = loadCartFromStorage();
const { totalItems, totalPrice } = calculateTotals(initialItems);

const initialState: CartState = {
  items: initialItems,
  totalItems,
  totalPrice,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;

      saveCartToStorage(state.items);
    },

    removeFromCart: (state, action: PayloadAction<{ _id: string }>) => {
      state.items = state.items.filter(
        (item) => !(item._id === action.payload._id),
      );

      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;

      saveCartToStorage(state.items);
    },

    increaseQuantity: (state, action: PayloadAction<{ _id: string }>) => {
      const item = state.items.find(
        (item) => item._id === action.payload._id,
      );

      if (item) {
        item.quantity += 1;
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;
        saveCartToStorage(state.items);
      }
    },

    decreaseQuantity: (state, action: PayloadAction<{ _id: string }>) => {
      const item = state.items.find(
        (item) => item._id === action.payload._id,
      );

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (i) => !(i._id === action.payload._id),
          );
        }

        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;
        saveCartToStorage(state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      saveCartToStorage([]);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        _id: string;
        quantity: number;
      }>,
    ) => {
      const item = state.items.find(
        (item) => item._id === action.payload._id,
      );

      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(
            (i) => !(i._id === action.payload._id),
          );
        } else {
          item.quantity = action.payload.quantity;
        }

        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;
        saveCartToStorage(state.items);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  updateQuantity,
} = CartSlice.actions;

export default CartSlice.reducer;
