import { Request, Response } from "express";
import httpStatus from "http-status";
import { SettingsServices } from "./settings.service";
import { ActivityLogService } from "../activityLogs/activityLog.service";
import { CustomRequest } from "../../Interface/request";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const getSettings = catchAsync(async (_req: Request, res: Response) => {
  const result = await SettingsServices.getSettingsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Settings retrieved successfully",
    data: result,
  });
});

const updateSettings = catchAsync(async (req: Request, res: Response) => {
  const result = await SettingsServices.updateSettingsInDB(req.body);

  // Log action
  const user = (req as unknown as CustomRequest).user;
  if (user) {
    await ActivityLogService.createLog({
      userName: user.name,
      userEmail: user.email,
      actionDescription: "Updated agency settings",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Settings updated successfully",
    data: result,
  });
});

export const SettingsController = {
  getSettings,
  updateSettings,
};
