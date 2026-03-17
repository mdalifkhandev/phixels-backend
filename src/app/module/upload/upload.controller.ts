import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const uploadFiles = catchAsync(async (req, res) => {
  const files = req.files as any[];
  
  if (!files || files.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "No files uploaded",
      data: null,
    });
  }

  const fileData = files.map((file) => ({
    name: file.originalname || "attachment",
    url: file.path, // Cloudinary uses 'path' for the direct URL when using multer-storage-cloudinary
    size: file.size,
    type: file.mimetype
  }));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Files uploaded successfully",
    data: fileData,
  });
});

export const UploadController = {
  uploadFiles,
};
