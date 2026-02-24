import { Schema, model } from 'mongoose';
import { TReview } from './review.interface';

const reviewSchema = new Schema<TReview>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    project: { type: String, required: true },
    budget: { type: String, required: true },
    duration: { type: String, required: true },
    summary: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

reviewSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

reviewSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const ReviewModel = model<TReview>('Review', reviewSchema);

