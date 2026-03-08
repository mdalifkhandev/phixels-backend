import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { CaseStudyServices } from "./caseStudy.service";
import { ActivityLogService } from "../activityLogs/activityLog.service";
import { CustomRequest } from "../../Interface/request";

const createCaseStudy = catchAsync(async (req: Request, res: Response) => {
  const result = await CaseStudyServices.createCaseStudyIntoDB(req.body);

  // Log action
  const user = (req as unknown as CustomRequest).user;
  if (user) {
    await ActivityLogService.createLog({
      userName: user.name,
      userEmail: user.email,
      actionDescription: `Created a new case study: ${result.title}`,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Case Study created successfully",
    data: result,
  });
});

const getAllCaseStudies = catchAsync(async (req: Request, res: Response) => {
  const result = await CaseStudyServices.getAllCaseStudiesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Case Studies retrieved successfully",
    data: result,
  });
});

const getSingleCaseStudy = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await CaseStudyServices.getSingleCaseStudyFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Case Study retrieved successfully",
    data: result,
  });
});

const updateCaseStudy = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await CaseStudyServices.updateCaseStudyInDB(id, req.body);

  // Log action
  const user = (req as unknown as CustomRequest).user;
  if (user && result) {
    await ActivityLogService.createLog({
      userName: user.name,
      userEmail: user.email,
      actionDescription: `Updated case study: ${result.title}`,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Case Study updated successfully",
    data: result,
  });
});

const deleteCaseStudy = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await CaseStudyServices.deleteCaseStudyFromDB(id);

  // Log action
  const user = (req as unknown as CustomRequest).user;
  if (user) {
    await ActivityLogService.createLog({
      userName: user.name,
      userEmail: user.email,
      actionDescription: `Deleted a case study (ID: ${id})`,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Case Study deleted successfully",
    data: result,
  });
});

const reorderCaseStudy = catchAsync(async (req: Request, res: Response) => {
  const { orderedIds } = req.body;
  const result = await CaseStudyServices.reorderCaseStudiesInDB(
    orderedIds as string[],
  );

  // Log action
  const user = (req as unknown as CustomRequest).user;
  if (user) {
    await ActivityLogService.createLog({
      userName: user.name,
      userEmail: user.email,
      actionDescription: "Reordered case studies",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Case Studies reordered successfully",
    data: result,
  });
});

const uploadCaseStudyImage = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Image file is required",
      data: null,
    });
    return;
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Case Study image uploaded successfully",
    data: { image: (req.file as any).path },
  });
});

export const CaseStudyController = {
  createCaseStudy,
  getAllCaseStudies,
  getSingleCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
  reorderCaseStudy,
  uploadCaseStudyImage,
};
