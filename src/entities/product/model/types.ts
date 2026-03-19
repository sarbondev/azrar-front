import { Translations } from "@/shared/types";

export interface ProductTranslation {
  title: string;
  description: string;
}

export interface ProductTypes {
  _id: string;
  price: number;
  category: {
    _id: string;
    name_uz: string;
    name_ru: string;
  };
  images: string[];
  colors: string[];
  stock: number;
  translations: Translations<ProductTranslation>;
}
