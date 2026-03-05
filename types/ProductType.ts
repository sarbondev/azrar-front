export interface TranslationsTypes {
  language: string;
  title: string;
}

export interface ProductTypes {
  category_id: string;
  price: number;
  stock: number;
  category: string;
  image_urls: string[];
  translations: TranslationsTypes[];
}
