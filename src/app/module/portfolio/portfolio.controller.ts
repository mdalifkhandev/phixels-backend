import { Request, Response } from "express";
import { PortfolioServices } from "./portfolio.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { ActivityLogService } from "../activityLogs/activityLog.service";
import { CustomRequest } from "../../Interface/request";

const createPortfolio = catchAsync(async (req: Request, res: Response) => {
  const result = await PortfolioServices.createPortfolioIntoDB(req.body);

  // Log action
  const user = (req as unknown as CustomRequest).user;
  if (user) {
    await ActivityLogService.createLog({
      userName: user.name,
      userEmail: user.email,
      actionDescription: `Created a new portfolio: ${result.title}`,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Portfolio created successfully",
    data: result,
  });
});

const getAllPortfolios = catchAsync(async (req: Request, res: Response) => {
  const result = await PortfolioServices.getAllPortfoliosFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Portfolios retrieved successfully",
    data: result,
  });
});

const getSinglePortfolio = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await PortfolioServices.getSinglePortfolioFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Portfolio retrieved successfully",
    data: result,
  });
});

const updatePortfolio = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await PortfolioServices.updatePortfolioInDB(id, req.body);

  // Log action
  const user = (req as unknown as CustomRequest).user;
  if (user && result) {
    await ActivityLogService.createLog({
      userName: user.name,
      userEmail: user.email,
      actionDescription: `Updated portfolio: ${result.title}`,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Portfolio updated successfully",
    data: result,
  });
});

const deletePortfolio = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await PortfolioServices.deletePortfolioFromDB(id);

  // Log action
  const user = (req as unknown as CustomRequest).user;
  if (user) {
    await ActivityLogService.createLog({
      userName: user.name,
      userEmail: user.email,
      actionDescription: `Deleted a portfolio (ID: ${id})`,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Portfolio deleted successfully",
    data: result,
  });
});

export const PortfolioController = {
  createPortfolio,
  getAllPortfolios,
  getSinglePortfolio,
  updatePortfolio,
  deletePortfolio,
};
