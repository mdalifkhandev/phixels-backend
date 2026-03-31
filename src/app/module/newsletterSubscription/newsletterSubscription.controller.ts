import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { NewsletterSubscriptionService } from "./newsletterSubscription.service";

const createNewsletterSubscription = catchAsync(async (req: Request, res: Response) => {
  const result = await NewsletterSubscriptionService.createNewsletterSubscriptionIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Newsletter subscription created successfully",
    data: result,
  });
});

const getAllNewsletterSubscriptions = catchAsync(async (req: Request, res: Response) => {
  const result = await NewsletterSubscriptionService.getAllNewsletterSubscriptionsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Newsletter subscriptions fetched successfully",
    data: result,
  });
});

const deleteNewsletterSubscription = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NewsletterSubscriptionService.deleteNewsletterSubscriptionFromDB(id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Newsletter subscription deleted successfully",
    data: result,
  });
});

export const NewsletterSubscriptionController = {
  createNewsletterSubscription,
  getAllNewsletterSubscriptions,
  deleteNewsletterSubscription,
};

