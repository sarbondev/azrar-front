import { ProductTypes } from "@/entities/product";

export interface CartItem extends Omit<ProductTypes, "quantity"> {
  quantity: number;
}

export interface CustomerTypes {
  fullName: string;
  phoneNumber: string;
  address: string;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface OrderProductPayload {
  product: string;
  quantity: number;
  price: number;
}

export interface OrderFormDataTypes {
  customer: CustomerTypes;
  products: OrderProductPayload[];
  totalPrice: number;
}
