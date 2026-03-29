import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import { ServiceCategoryModel, ServiceModel } from "../service/service.model";
import AppError from "../../error/appError";
import httpStatus from "http-status";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const buildUniqueSlug = async (candidate: string, excludeId?: string) => {
  const base = slugify(candidate) || "blog-post";
  let slug = base;
  let counter = 1;

  while (true) {
    const existing = await Blog.findOne({
      slug,
      ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    })
      .select("_id")
      .lean();
    if (!existing) return slug;
    counter += 1;
    slug = `${base}-${counter}`;
  }
};

const resolveIconFromService = async (serviceId?: string) => {
  if (!serviceId) return "";
  const serviceCategory = await ServiceCategoryModel.findById(serviceId)
    .select("iconKey")
    .lean();
  if (serviceCategory?.iconKey) return serviceCategory.iconKey;

  const service = await ServiceModel.findById(serviceId).select("icon").lean();
  return service?.icon || "";
};

const createBlog = async (payload: TBlog) => {
  if (!payload.slug) {
    payload.slug = await buildUniqueSlug(payload.title);
  } else {
    payload.slug = await buildUniqueSlug(payload.slug);
  }
  if (!payload.status) payload.status = "draft";
  if (!payload.categoryName) payload.categoryName = "Uncategorized";
  payload.icon = await resolveIconFromService(payload.serviceId);

  const result = await Blog.create(payload);
  return result;
};

const getAllBlogs = async () => {
  const result = await Blog.find().sort({ position: 1, createdAt: -1 });
  return result;
};

const getSingleBlog = async (id: string) => {
  const result = await Blog.findById(id);
  return result;
};

const updateBlog = async (id: string, payload: Partial<TBlog>) => {
  if (payload.slug) {
    payload.slug = await buildUniqueSlug(payload.slug, id);
  } else if (payload.title) {
    payload.slug = await buildUniqueSlug(payload.title, id);
  }
  if (payload.serviceId !== undefined) {
    payload.icon = await resolveIconFromService(payload.serviceId);
  }

  if (payload.isFeatured === true) {
    await Blog.updateMany(
      { _id: { $ne: id }, isFeatured: true },
      { isFeatured: false, featuredOrder: null },
    );
    if (payload.featuredOrder === undefined) {
      payload.featuredOrder = 1;
    }
  }

  const result = await Blog.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteBlog = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

const getFeaturedBlogs = async () => {
  return Blog.find({ isFeatured: true, status: "published" })
    .sort({ featuredOrder: 1, updatedAt: -1 })
    .limit(5);
};

const getSingleBlogBySlug = async (slug: string) => {
  return Blog.findOne({ slug });
};

const updateFeatureStatus = async (
  id: string,
  payload: { isFeatured: boolean; featuredOrder?: number | null },
) => {
  const existing = await Blog.findById(id);
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }

  if (payload.isFeatured) {
    await Blog.updateMany(
      { _id: { $ne: id }, isFeatured: true },
      { isFeatured: false, featuredOrder: null },
    );
  }

  return Blog.findByIdAndUpdate(
    id,
    {
      isFeatured: payload.isFeatured,
      featuredOrder: payload.isFeatured ? (payload.featuredOrder ?? 1) : null,
    },
    { new: true },
  );
};

const updateBlogPositions = async (
  blogs: { id: string; position: number }[],
) => {
  const bulkOps = blogs.map((blog) => ({
    updateOne: {
      filter: { _id: blog.id } as any,
      update: { $set: { position: blog.position } },
    },
  }));

  if (bulkOps.length > 0) {
    await Blog.bulkWrite(bulkOps);
  }
  return { message: "Positions updated successfully" };
};

export const BlogService = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getFeaturedBlogs,
  getSingleBlogBySlug,
  updateFeatureStatus,
  updateBlogPositions,
};
