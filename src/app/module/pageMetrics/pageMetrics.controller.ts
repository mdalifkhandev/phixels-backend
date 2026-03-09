import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PageMetricsServices } from "./pageMetrics.service";

const getPageMetrics = catchAsync(async (_req, res) => {
  const result = await PageMetricsServices.getPageMetricsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Page metrics retrieved successfully",
    data: result,
  });
});

const updatePageMetrics = catchAsync(async (req, res) => {
  const result = await PageMetricsServices.updatePageMetricsIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Page metrics updated successfully",
    data: result,
  });
});

export const PageMetricsControllers = {
  getPageMetrics,
  updatePageMetrics,
};
