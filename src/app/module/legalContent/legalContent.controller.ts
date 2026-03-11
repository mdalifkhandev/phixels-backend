import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { LegalContentServices } from "./legalContent.service";

const getLegalContent = catchAsync(async (req: Request, res: Response) => {
  const result = await LegalContentServices.getLegalContentFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Legal content fetched successfully",
    data: result,
  });
});

const updateLegalContent = catchAsync(async (req: Request, res: Response) => {
  const result = await LegalContentServices.updateLegalContentIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Legal content updated successfully",
    data: result,
  });
});

export const LegalContentControllers = {
  getLegalContent,
  updateLegalContent,
};
