import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AboutContentServices } from "./aboutContent.service";

const getAboutContent = catchAsync(async (req, res) => {
  const result = await AboutContentServices.getAboutContentFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "About content retrieved successfully",
    data: result,
  });
});

const updateAboutContent = catchAsync(async (req, res) => {
  const result = await AboutContentServices.updateAboutContentIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "About content updated successfully",
    data: result,
  });
});

const uploadAboutContentImage = catchAsync(async (req, res) => {
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

export const AboutContentControllers = {
  getAboutContent,
  updateAboutContent,
  uploadAboutContentImage,
};
