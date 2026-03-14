import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { PageContentService } from "./pageContent.service";

const createOrUpdatePageContent = catchAsync(async (req: Request, res: Response) => {
  const result = await PageContentService.createOrUpdatePageContent(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Page content updated successfully",
    data: result,
  });
});

const getPageContent = catchAsync(async (req: Request, res: Response) => {
  const { pageKey } = req.params;
  const result = await PageContentService.getPageContent(pageKey as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Page content fetched successfully",
    data: result,
  });
});

const getAllPageContent = catchAsync(async (req: Request, res: Response) => {
  const result = await PageContentService.getAllPageContent();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All page content fetched successfully",
    data: result,
  });
});

export const PageContentController = {
  createOrUpdatePageContent,
  getPageContent,
  getAllPageContent,
};
