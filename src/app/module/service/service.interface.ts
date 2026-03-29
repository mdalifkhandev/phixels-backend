import { Types } from "mongoose";

export type TService = {
  title: string;
  description: string;
  icon: string;
  features: string[];
  images: string[];
  isDeleted?: boolean;
};

export type TServiceSeo = {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
};

export type TServiceCategory = {
  name: string;
  slug: string;
  description: string;
  iconKey: string;
  heroImage?: string;
  bannerImage?: string;
  sortOrder?: number;
  isActive?: boolean;
  seo?: TServiceSeo;
  isDeleted?: boolean;
};

export type TServiceSubcategoryFaq = {
  question: string;
  answer: string;
};

export type TServiceSubcategoryCta = {
  title?: string;
  description?: string;
  buttonText?: string;
};

export type TServiceSubcategory = {
  categoryId: string | Types.ObjectId;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription?: string;
  coverImage?: string;
  gallery?: string[];
  keyFeatures?: string[];
  techStack?: string[];
  processSteps?: string[];
  faq?: TServiceSubcategoryFaq[];
  cta?: TServiceSubcategoryCta;
  sortOrder?: number;
  isActive?: boolean;
  seo?: TServiceSeo;
  isDeleted?: boolean;
};
