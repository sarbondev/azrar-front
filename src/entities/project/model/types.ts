export type Lang = "ru" | "uz";

export interface ProjectTranslation {
  title: string;
  address: string;
  solution: string;
  result: string;
}

export interface ProjectTypes {
  _id: string;
  translations: Record<Lang, ProjectTranslation>;
  images: string[];
  createdAt: string;
  updatedAt: string;
}
