import { TReview } from './review.interface';
import { ReviewModel } from './review.model';

const createReviewIntoDB = async (payload: TReview) => {
  const result = await ReviewModel.create(payload);
  return result;
};

const getAllReviewsFromDB = async () => {
  const result = await ReviewModel.find().sort({ position: 1, createdAt: -1 });
  return result;
};

const getSingleReviewFromDB = async (id: string) => {
  const result = await ReviewModel.findById(id);
  return result;
};

const updateReviewInDB = async (id: string, payload: Partial<TReview>) => {
  const result = await ReviewModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteReviewFromDB = async (id: string) => {
  const result = await ReviewModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const updateReviewPositionsArray = async (orderedIds: string[]) => {
  const { Types } = require('mongoose');
  const bulkOperations = orderedIds.map((id, index) => ({
    updateOne: {
      filter: { _id: new Types.ObjectId(id) },
      update: { position: index },
    },
  }));

  const result = await ReviewModel.bulkWrite(bulkOperations);
  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
  getAllReviewsFromDB,
  getSingleReviewFromDB,
  updateReviewInDB,
  deleteReviewFromDB,
  updateReviewPositionsArray,
};
