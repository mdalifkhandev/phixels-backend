import { PageContent } from "./pageContent.model";
import { TPageContent } from "./pageContent.interface";

const createOrUpdatePageContent = async (payload: TPageContent) => {
  const result = await PageContent.findOneAndUpdate(
    { pageKey: payload.pageKey },
    payload,
    { upsert: true, new: true }
  );
  return result;
};

const getPageContent = async (pageKey: string) => {
  const result = await PageContent.findOne({ pageKey });
  return result;
};

const getAllPageContent = async () => {
  const result = await PageContent.find();
  return result;
};

export const PageContentService = {
  createOrUpdatePageContent,
  getPageContent,
  getAllPageContent,
};
