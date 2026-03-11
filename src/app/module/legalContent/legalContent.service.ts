import { LegalContent } from "./legalContent.model";
import { TLegalContent } from "./legalContent.interface";

const getLegalContentFromDB = async () => {
  let content = await LegalContent.findOne();
  if (!content) {
    content = await LegalContent.create({
      privacyPolicy: [],
      termsConditions: [],
    });
  }
  return content;
};

const updateLegalContentIntoDB = async (payload: Partial<TLegalContent>) => {
  let content = await LegalContent.findOne();

  if (!content) {
    content = await LegalContent.create(payload);
    return content;
  }

  const updatedContent = await LegalContent.findOneAndUpdate(
    {},
    { $set: payload },
    { new: true, runValidators: true },
  );

  return updatedContent;
};

export const LegalContentServices = {
  getLegalContentFromDB,
  updateLegalContentIntoDB,
};
