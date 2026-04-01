import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProjectRequestServices } from "./projectRequest.service";
import { SendMail } from "../mails/utils";
import config from "../../config";
import { getStep2ClientEmailTemplate, getStep2AdminEmailTemplate } from "./projectRequest.utils";

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
  
  // If status is becoming "Confirmed", mark Step 1 email as "done" (suppress delayed email) 
  // and mark Step 2 as about to be sent.
  const updatePayload = { ...req.body };
  if (req.body.status === "Confirmed") {
    updatePayload.isStep1EmailSent = true;
    updatePayload.isStep2EmailSent = true;
  }

  const result = await ProjectRequestServices.updateProjectRequestInDB(
    id as string,
    updatePayload,
  );

  // If status is Confirmed, send Step 2 email immediately
  if (req.body.status === "Confirmed" && result) {
    try {
      // Client email
      const clientTemplate = getStep2ClientEmailTemplate(result.name, result.meetingDate as string, result.meetingTime as string);
      await SendMail({
        to: result.email,
        subject: clientTemplate.subject,
        html: clientTemplate.html
      });

      // Admin email
      const adminTemplate = getStep2AdminEmailTemplate(result);
      await SendMail({
        to: config.NODE_MILER_USER as string, // Default admin email
        subject: adminTemplate.subject,
        html: adminTemplate.html
      });
      
      console.log(`[ProjectRequest] Sent Step 2 immediate notification for request ${id}`);
    } catch (error) {
      console.error("[ProjectRequest Error] Step 2 notification failed:", error);
    }
  }

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
