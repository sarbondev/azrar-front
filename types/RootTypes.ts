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
  title: string;
  price: number;
  category: string;
  image?: string;
}

export interface UserTypes {
  id: number;
  fullName: string;
  phoneNumber: string;
}
