export type TProduct = {
  name: string;
  description: string;
  features: string[];
  pricing?: number;
  demoLink?: string;
  images: string[];
  category: string;
  reviewRating?: number | null;
  userCount?: number | null;
  downloadsEnabled?: boolean;
  downloadCount?: number | null;
  isPinned?: boolean;
  pinOrder?: 1 | 2 | 3 | null;
  isDeleted?: boolean;
};
