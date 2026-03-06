import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ReviewServices } from "./review.service";
import { ActivityLogService } from "../activityLogs/activityLog.service";
import { CustomRequest } from "../../Interface/request";

const createReview = catchAsync(async (req: Request, res: Response) => {
  if (req.file) {
    req.body.image = (req.file as any).path;
  }
  const result = await ReviewServices.createReviewIntoDB(req.body);

  // Log action
  const user = (req as unknown as CustomRequest).user;
  if (user) {
    await ActivityLogService.createLog({
      userName: user.name,
      userEmail: user.email,
      actionDescription: `Created a new review for: ${result.name}`,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review created successfully",
    data: result,
  });
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewServices.getAllReviewsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews retrieved successfully",
    data: result,
  });
});

const getSingleReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewServices.getSingleReviewFromDB(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review retrieved successfully",
    data: result,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (req.file) {
    req.body.image = (req.file as any).path;
  }
  const result = await ReviewServices.updateReviewInDB(id as string, req.body);

  // Log action
  const user = (req as unknown as CustomRequest).user;
  if (user && result) {
    await ActivityLogService.createLog({
      userName: user.name,
      userEmail: user.email,
      actionDescription: `Updated review for: ${result.name}`,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review updated successfully",
    data: result,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewServices.deleteReviewFromDB(id as string);

  // Log action
  const user = (req as unknown as CustomRequest).user;
  if (user) {
    await ActivityLogService.createLog({
      userName: user.name,
      userEmail: user.email,
      actionDescription: `Deleted a review (ID: ${id})`,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review deleted successfully",
    data: result,
  });
});

const uploadReviewImage = catchAsync(async (req: Request, res: Response) => {
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
    message: "Image uploaded successfully",
    data: { image: (req.file as any).path },
  });
});

const updateReviewPositions = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ReviewServices.updateReviewPositionsArray(
      req.body.orderedIds,
    );

    // Log action
    const user = (req as unknown as CustomRequest).user;
    if (user) {
      await ActivityLogService.createLog({
        userName: user.name,
        userEmail: user.email,
        actionDescription: "Reordered review positions",
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Review positions updated successfully",
      data: result,
    });
  },
);

export const ReviewController = {
  createReview,
  uploadReviewImage,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  updateReviewPositions,
};
