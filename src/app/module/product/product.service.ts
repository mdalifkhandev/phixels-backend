import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";
import AppError from "../../error/appError";
import httpStatus from "http-status";
import mongoose from "mongoose";

const createProductIntoDB = async (payload: TProduct) => {
  if (payload.downloadsEnabled !== true) {
    payload.downloadCount = null;
  }
  const result = await ProductModel.create(payload);
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown> = {}) => {
  const filter: Record<string, any> = {};
  if (query.all !== "true") {
    filter.isActive = true;
  }
  const result = await ProductModel.find(filter).sort({
    position: 1,
    createdAt: -1,
  });
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  if (!mongoose.isValidObjectId(id)) return null;
  const result = await ProductModel.findById(id);
  return result;
};

const updateProductInDB = async (id: string, payload: Partial<TProduct>) => {
  if (!mongoose.isValidObjectId(id)) return null;
  if (payload.downloadsEnabled === false) {
    payload.downloadCount = null;
  }
  const result = await ProductModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteProductFromDB = async (id: string) => {
  if (!mongoose.isValidObjectId(id)) return null;
  const result = await ProductModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const getPinnedProductsFromDB = async () => {
  const result = await ProductModel.find({ isPinned: true })
    .sort({ pinOrder: 1, updatedAt: -1 })
    .limit(3);
  return result;
};

const updateProductPinInDB = async (
  id: string,
  payload: { isPinned: boolean; pinOrder?: 1 | 2 | 3 | null },
) => {
  if (!mongoose.isValidObjectId(id)) return null;

  const existing = await ProductModel.findById(id);
  if (!existing) return null;

  if (!payload.isPinned) {
    return ProductModel.findByIdAndUpdate(
      id,
      { isPinned: false, pinOrder: null },
      { new: true },
    );
  }

  const requestedOrder = payload.pinOrder ?? null;
  if (!requestedOrder) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "pinOrder is required when isPinned is true",
    );
  }

  const conflict = await ProductModel.findOne({
    _id: { $ne: id },
    isPinned: true,
    pinOrder: requestedOrder,
    isDeleted: { $ne: true },
  });

  if (conflict) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Pin order ${requestedOrder} is already occupied.`,
    );
  }

  const currentlyPinnedCount = await ProductModel.countDocuments({
    isPinned: true,
    _id: { $ne: id },
    isDeleted: { $ne: true },
  });

  if (!existing.isPinned && currentlyPinnedCount >= 3) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Maximum 3 pinned products allowed.",
    );
  }

  return ProductModel.findByIdAndUpdate(
    id,
    { isPinned: true, pinOrder: requestedOrder },
    { new: true },
  );
};

const updateProductPositionsArray = async (orderedIds: string[]) => {
  const bulkOperations = orderedIds.map((id, index) => ({
    updateOne: {
      filter: { _id: new mongoose.Types.ObjectId(id) },
      update: { position: index },
    },
  }));

  const result = await ProductModel.bulkWrite(bulkOperations);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductInDB,
  deleteProductFromDB,
  getPinnedProductsFromDB,
  updateProductPinInDB,
  updateProductPositionsArray,
};
