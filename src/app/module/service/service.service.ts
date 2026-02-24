import {
  TService,
  TServiceCategory,
  TServiceSubcategory,
} from './service.interface';
import {
  ServiceCategoryModel,
  ServiceModel,
  ServiceSubcategoryModel,
} from './service.model';
import { Types } from 'mongoose';

// Legacy service methods
const createServiceIntoDB = async (payload: TService) => {
  return ServiceModel.create(payload);
};

const getAllServicesFromDB = async () => {
  return ServiceModel.find();
};

const getSingleServiceFromDB = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) return null;
  return ServiceModel.findById(id);
};

const updateServiceInDB = async (id: string, payload: Partial<TService>) => {
  if (!Types.ObjectId.isValid(id)) return null;
  return ServiceModel.findByIdAndUpdate(id, payload, { new: true });
};

const deleteServiceFromDB = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) return null;
  return ServiceModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

// New category methods
const createServiceCategoryIntoDB = async (payload: TServiceCategory) => {
  return ServiceCategoryModel.create(payload);
};

const getAllServiceCategoriesFromDB = async () => {
  return ServiceCategoryModel.find().sort({ sortOrder: 1, createdAt: -1 });
};

const getServiceCategoryBySlugFromDB = async (slug: string) => {
  return ServiceCategoryModel.findOne({ slug });
};

const updateServiceCategoryInDB = async (
  id: string,
  payload: Partial<TServiceCategory>,
) => {
  if (!Types.ObjectId.isValid(id)) return null;
  return ServiceCategoryModel.findByIdAndUpdate(id, payload, { new: true });
};

const deleteServiceCategoryFromDB = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) return null;
  return ServiceCategoryModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
};

// New subcategory methods
const createServiceSubcategoryIntoDB = async (payload: TServiceSubcategory) => {
  return ServiceSubcategoryModel.create(payload);
};

const getAllServiceSubcategoriesFromDB = async () => {
  return ServiceSubcategoryModel.find()
    .populate('categoryId', 'name slug')
    .sort({ sortOrder: 1, createdAt: -1 });
};

const updateServiceSubcategoryInDB = async (
  id: string,
  payload: Partial<TServiceSubcategory>,
) => {
  if (!Types.ObjectId.isValid(id)) return null;
  return ServiceSubcategoryModel.findByIdAndUpdate(id, payload, { new: true });
};

const deleteServiceSubcategoryFromDB = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) return null;
  return ServiceSubcategoryModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
};

const getServiceSubcategoryBySlugsFromDB = async (
  categorySlug: string,
  subcategorySlug: string,
) => {
  const category = await ServiceCategoryModel.findOne({
    slug: categorySlug,
    isActive: true,
  });
  if (!category) return null;

  const subcategory = await ServiceSubcategoryModel.findOne({
    categoryId: category._id,
    slug: subcategorySlug,
    isActive: true,
  });
  if (!subcategory) return null;

  return { category, subcategory };
};

const getServiceCategoryDetailBySlugFromDB = async (slug: string) => {
  const category = await ServiceCategoryModel.findOne({ slug, isActive: true });
  if (!category) return null;

  const subcategories = await ServiceSubcategoryModel.find({
    categoryId: category._id,
    isActive: true,
  }).sort({ sortOrder: 1, createdAt: -1 });

  return { category, subcategories };
};

const getServiceMenuFromDB = async () => {
  const categories = await ServiceCategoryModel.find({ isActive: true })
    .select('name slug iconKey sortOrder')
    .sort({ sortOrder: 1, createdAt: -1 })
    .lean();

  const categoryIds = categories.map((c: any) => c._id);

  const subcategories = await ServiceSubcategoryModel.find({
    categoryId: { $in: categoryIds },
    isActive: true,
  })
    .select('name slug categoryId sortOrder')
    .sort({ sortOrder: 1, createdAt: -1 })
    .lean();

  const grouped = new Map<string, Array<{ name: string; slug: string }>>();
  subcategories.forEach((sub: any) => {
    const key = String(sub.categoryId);
    const existing = grouped.get(key) || [];
    existing.push({ name: sub.name, slug: sub.slug });
    grouped.set(key, existing);
  });

  return categories.map((category: any) => ({
    ...category,
    subcategories: grouped.get(String(category._id)) || [],
  }));
};

export const ServiceServices = {
  // Legacy
  createServiceIntoDB,
  getAllServicesFromDB,
  getSingleServiceFromDB,
  updateServiceInDB,
  deleteServiceFromDB,
  // Categories
  createServiceCategoryIntoDB,
  getAllServiceCategoriesFromDB,
  getServiceCategoryBySlugFromDB,
  getServiceCategoryDetailBySlugFromDB,
  updateServiceCategoryInDB,
  deleteServiceCategoryFromDB,
  // Subcategories
  createServiceSubcategoryIntoDB,
  getAllServiceSubcategoriesFromDB,
  getServiceSubcategoryBySlugsFromDB,
  updateServiceSubcategoryInDB,
  deleteServiceSubcategoryFromDB,
  // Menu
  getServiceMenuFromDB,
};
