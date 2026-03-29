import httpStatus from "http-status";
import AppError from "../../error/appError";
import { TPageMetric, TPageMetricsContent } from "./pageMetrics.interface";
import { PageMetricsModel } from "./pageMetrics.model";

const validateMetricArrayLength = (
  key: keyof TPageMetricsContent,
  value: TPageMetric[],
) => {
  const expectedLengthMap: Record<keyof TPageMetricsContent, number> = {
    homeHeroMetrics: 2,
    servicesPageMetrics: 4,
    productsPageMetrics: 4,
  };

  if (value.length !== expectedLengthMap[key]) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${key} must contain exactly ${expectedLengthMap[key]} items`,
    );
  }
};

const getPageMetricsFromDB = async () => {
  let content = await PageMetricsModel.findOne();

  if (!content) {
    content = await PageMetricsModel.create({});
  }

  return content;
};

const updatePageMetricsIntoDB = async (
  payload: Partial<TPageMetricsContent>,
) => {
  if (payload.homeHeroMetrics) {
    validateMetricArrayLength("homeHeroMetrics", payload.homeHeroMetrics);
  }

  if (payload.servicesPageMetrics) {
    validateMetricArrayLength(
      "servicesPageMetrics",
      payload.servicesPageMetrics,
    );
  }

  if (payload.productsPageMetrics) {
    validateMetricArrayLength(
      "productsPageMetrics",
      payload.productsPageMetrics,
    );
  }

  let content = await PageMetricsModel.findOne();

  if (!content) {
    content = await PageMetricsModel.create(payload);
    return content;
  }

  const updatedContent = await PageMetricsModel.findOneAndUpdate(
    {},
    { $set: payload },
    { new: true, runValidators: true },
  );

  if (!updatedContent) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Failed to update page metrics content",
    );
  }

  return updatedContent;
};

export const PageMetricsServices = {
  getPageMetricsFromDB,
  updatePageMetricsIntoDB,
};
