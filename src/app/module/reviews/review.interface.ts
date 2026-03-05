export type TReview = {
  name: string;
  role: string;
  image: string;
  rating: number;
  review: string;
  project: string;
  budget: string;
  duration: string;
  summary: string;
  position?: number;
  isActive?: boolean;
  isDeleted?: boolean;
};
