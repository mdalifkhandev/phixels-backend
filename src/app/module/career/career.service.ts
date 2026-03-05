import { TCareer } from "./career.interface";
import { CareerModel } from "./career.model";

const createCareerIntoDB = async (payload: TCareer) => {
  const result = await CareerModel.create(payload);
  return result;
};

const getAllCareersFromDB = async (query: Record<string, unknown> = {}) => {
  const filter: Record<string, any> = {};
  if (query.all !== "true") {
    filter.isActive = true;
  }
  const result = await CareerModel.find(filter).sort({
    position: 1,
    createdAt: -1,
  });
  return result;
};

const getSingleCareerFromDB = async (id: string) => {
  const result = await CareerModel.findById(id);
  return result;
};

const updateCareerInDB = async (id: string, payload: Partial<TCareer>) => {
  const result = await CareerModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteCareerFromDB = async (id: string) => {
  const result = await CareerModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const updateCareerPositionsArray = async (orderedIds: string[]) => {
  const { Types } = require("mongoose");
  const bulkOperations = orderedIds.map((id, index) => ({
    updateOne: {
      filter: { _id: new Types.ObjectId(id) },
      update: { position: index },
    },
  }));

  const result = await CareerModel.bulkWrite(bulkOperations);
  return result;
};

export const CareerServices = {
  createCareerIntoDB,
  getAllCareersFromDB,
  getSingleCareerFromDB,
  updateCareerInDB,
  deleteCareerFromDB,
  updateCareerPositionsArray,
};
