import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ContactRequestService } from "./contactRequest.service";

const createContactRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactRequestService.createContactRequestIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact request created successfully",
    data: result,
  });
});

const getAllContactRequests = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactRequestService.getAllContactRequestsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact requests fetched successfully",
    data: result,
  });
});

const getSingleContactRequest = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ContactRequestService.getSingleContactRequestFromDB(id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact request fetched successfully",
    data: result,
  });
});

const updateContactRequest = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ContactRequestService.updateContactRequestIntoDB(id as string, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact request updated successfully",
    data: result,
  });
});

const deleteContactRequest = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ContactRequestService.deleteContactRequestFromDB(id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact request deleted successfully",
    data: result,
  });
});

export const ContactRequestController = {
  createContactRequest,
  getAllContactRequests,
  getSingleContactRequest,
  updateContactRequest,
  deleteContactRequest,
};

