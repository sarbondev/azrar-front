import { Translations } from ".";

export interface TranslationsTypes {
  title: string;
  description: string;
}

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
  image_urls: string[];
  translations: Translations<ProductTranslation>;
}
