import { NewsletterSubscriptionModel } from "./newsletterSubscription.model";
import { TNewsletterSubscription } from "./newsletterSubscription.interface";

const createNewsletterSubscriptionIntoDB = async (payload: TNewsletterSubscription) => {
  const result = await NewsletterSubscriptionModel.create(payload);
  return result;
};

const getAllNewsletterSubscriptionsFromDB = async () => {
  const result = await NewsletterSubscriptionModel.find().sort("-createdAt");
  return result;
};

const deleteNewsletterSubscriptionFromDB = async (id: string) => {
  const result = await NewsletterSubscriptionModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const NewsletterSubscriptionService = {
  createNewsletterSubscriptionIntoDB,
  getAllNewsletterSubscriptionsFromDB,
  deleteNewsletterSubscriptionFromDB,
};

