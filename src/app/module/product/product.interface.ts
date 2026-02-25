export type TProduct = {
  name: string;
  description: string;
  features: string[];
  pricing: number;
  demoLink?: string;
  images: string[];
  category: string;
  isPinned?: boolean;
  pinOrder?: 1 | 2 | 3 | null;
  isDeleted?: boolean;
};
