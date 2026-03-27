export {
  default as cartReducer,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  updateQuantity,
} from "./model/cartSlice";
export type { CartItem } from "./model/types";
