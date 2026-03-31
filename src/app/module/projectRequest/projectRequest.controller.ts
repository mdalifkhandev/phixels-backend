import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProjectRequestServices } from "./projectRequest.service";

const createProjectRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectRequestServices.createProjectRequestIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project request created successfully",
    data: result,
  });
});

const getAllProjectRequests = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ProjectRequestServices.getAllProjectRequestsFromDB(
      req.query,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Project requests retrieved successfully",
      data: result,
    });
  },
);

const getSingleProjectRequest = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await ProjectRequestServices.getSingleProjectRequestFromDB(id as string);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Project request retrieved successfully",
      data: result,
    });
  },
);

const updateProjectRequest = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectRequestServices.updateProjectRequestInDB(
    id as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project request updated successfully",
    data: result,
  });
});

const deleteProjectRequest = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectRequestServices.deleteProjectRequestFromDB(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project request deleted successfully",
    data: result,
  });
});

export const ProjectRequestController = {
  createProjectRequest,
  getAllProjectRequests,
  getSingleProjectRequest,
  updateProjectRequest,
  deleteProjectRequest,
};
