import { Request, Response } from "express";
import { ActivityLogService } from "./activityLog.service";

const getLogs = async (req: Request, res: Response) => {
  try {
    const logs = await ActivityLogService.getLogs();
    res.status(200).json({
      success: true,
      message: "Activity logs retrieved successfully",
      data: logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching logs",
      error,
    });
  }
};

export const ActivityLogController = {
  getLogs,
};
