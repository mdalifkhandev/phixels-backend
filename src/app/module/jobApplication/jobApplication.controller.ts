import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { JobApplicationService } from "./jobApplication.service";

const createJobApplication = catchAsync(async (req: Request, res: Response) => {
  const result = await JobApplicationService.createJobApplicationIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Job application created successfully",
    data: result,
  });
});

const getAllJobApplications = catchAsync(async (req: Request, res: Response) => {
  const result = await JobApplicationService.getAllJobApplicationsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Job applications fetched successfully",
    data: result,
  });
});

const updateJobApplication = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await JobApplicationService.updateJobApplicationIntoDB(id as string, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Job application updated successfully",
    data: result,
  });
});

const deleteJobApplication = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await JobApplicationService.deleteJobApplicationFromDB(id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Job application deleted successfully",
    data: result,
  });
});

export const JobApplicationController = {
  createJobApplication,
  getAllJobApplications,
  updateJobApplication,
  deleteJobApplication,
};

