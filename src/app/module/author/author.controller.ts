import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthorServices } from "./author.service";
import AppError from "../../error/appError";

const createAuthor = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthorServices.createAuthorIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Author created successfully",
    data: result,
  });
});

const getAllAuthors = catchAsync(async (_req: Request, res: Response) => {
  const result = await AuthorServices.getAllAuthorsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Authors retrieved successfully",
    data: result,
  });
});

const deleteAuthor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AuthorServices.deleteAuthorFromDB(id as string);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Author not found");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Author deleted successfully",
    data: result,
  });
});

export const AuthorController = {
  createAuthor,
  getAllAuthors,
  deleteAuthor,
};
