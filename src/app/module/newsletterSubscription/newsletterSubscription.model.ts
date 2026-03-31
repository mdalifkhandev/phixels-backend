import { Schema, model } from "mongoose";
import { TNewsletterSubscription } from "./newsletterSubscription.interface";

const newsletterSubscriptionSchema = new Schema<TNewsletterSubscription>(
  {
    email: { type: String, required: true, unique: true },
    requestId: { type: String, required: true, unique: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

newsletterSubscriptionSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

newsletterSubscriptionSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const NewsletterSubscriptionModel = model<TNewsletterSubscription>(
  "NewsletterSubscription",
  newsletterSubscriptionSchema,
);

