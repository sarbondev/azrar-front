import { Translations } from "@/shared/types";
import { colorTypes } from "@/shared/types/color";

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
  colors: colorTypes[];
  stock: number;
  translations: Translations<ProductTranslation>;
}
