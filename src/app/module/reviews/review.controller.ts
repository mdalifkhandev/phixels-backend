import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReviewServices } from './review.service';

const createReview = catchAsync(async (req: Request, res: Response) => {
  if (req.file) {
    req.body.image = (req.file as any).path;
  }
  const result = await ReviewServices.createReviewIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review created successfully',
    data: result,
  });
});

const getAllReviews = catchAsync(async (_req: Request, res: Response) => {
  const result = await ReviewServices.getAllReviewsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews retrieved successfully',
    data: result,
  });
});

const getSingleReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewServices.getSingleReviewFromDB(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review retrieved successfully',
    data: result,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (req.file) {
    req.body.image = (req.file as any).path;
  }
  const result = await ReviewServices.updateReviewInDB(id as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review updated successfully',
    data: result,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewServices.deleteReviewFromDB(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted successfully',
    data: result,
  });
});

const uploadReviewImage = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Image file is required',
      data: null,
    });
    return;
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Image uploaded successfully',
    data: { image: (req.file as any).path },
  });
});

export const ReviewController = {
  createReview,
  uploadReviewImage,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
