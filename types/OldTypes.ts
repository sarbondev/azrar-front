export interface SystemTypes {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export interface ProjectTypes { 
  id: number;
  title: string;
  object: string;
  solution: string;
  result: string;
  image: string;
}

export interface ProductTypes {
  _id: string;
  translations: {
    uz: {
      title: string;
      description: string;
    };
    ru: {
      title: string;
      description: string;
    };
  };
  price: number;
  category: {
    _id: string;
    name_uz: string;
    name_ru: string;
  };
  images: string[];
  colors: string[];
}
