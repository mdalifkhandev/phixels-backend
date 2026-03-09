import { AboutContent } from "./aboutContent.model";
import { TAboutContent } from "./aboutContent.interface";
import AppError from "../../error/appError";
import httpStatus from "http-status";

const getAboutContentFromDB = async () => {
  let content = await AboutContent.findOne();
  if (!content) {
    // Return default empty structure if none exists
    content = await AboutContent.create({});
  }
  return content;
};

const updateAboutContentIntoDB = async (payload: Partial<TAboutContent>) => {
  let content = await AboutContent.findOne();

  if (!content) {
    content = await AboutContent.create(payload);
    return content;
  }

  const updatedContent = await AboutContent.findOneAndUpdate(
    {},
    { $set: payload },
    { new: true, runValidators: true },
  );

  if (!updatedContent) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Failed to update about content",
    );
  }

  return updatedContent;
};

export const AboutContentServices = {
  getAboutContentFromDB,
  updateAboutContentIntoDB,
};
