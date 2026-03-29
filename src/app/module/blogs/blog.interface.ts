export type TBlog = {
  title: string;
  writer: string;
  createTime?: Date;
  readingTime: string;
  image: string;
  details: string;
  tags?: string[];
  categoryName?: string;
  slug?: string;
  status?: "draft" | "published";
  serviceId?: string;
  authorId?: string;
  icon?: string;
  isFeatured?: boolean;
  featuredOrder?: number | null;
  position?: number;
};
