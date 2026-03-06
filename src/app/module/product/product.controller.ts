import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.service";
import AppError from "../../error/appError";
import { ActivityLogService } from "../activityLogs/activityLog.service";
import { CustomRequest } from "../../Interface/request";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.createProductIntoDB(req.body);

  // Log action
  const user = (req as unknown as CustomRequest).user;
  if (user) {
    await ActivityLogService.createLog({
      userName: user.name,
      userEmail: user.email,
      actionDescription: `Created a new product: ${result.name}`,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.getAllProductsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products retrieved successfully",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductServices.getSingleProductFromDB(id as string);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product retrieved successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductServices.updateProductInDB(
    id as string,
    req.body,
  );
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  // Log action
  const user = (req as unknown as CustomRequest).user;
  if (user && result) {
    await ActivityLogService.createLog({
      userName: user.name,
      userEmail: user.email,
      actionDescription: `Updated product: ${result.name}`,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductServices.deleteProductFromDB(id as string);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  // Log action
  const user = (req as unknown as CustomRequest).user;
  if (user) {
    await ActivityLogService.createLog({
      userName: user.name,
      userEmail: user.email,
      actionDescription: `Deleted a product (ID: ${id})`,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

const getPinnedProducts = catchAsync(async (_req: Request, res: Response) => {
  const result = await ProductServices.getPinnedProductsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pinned products retrieved successfully",
    data: result,
  });
});

const updateProductPin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductServices.updateProductPinInDB(
    id as string,
    req.body,
  );
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  // Log action
  const user = (req as unknown as CustomRequest).user;
  if (user && result) {
    await ActivityLogService.createLog({
      userName: user.name,
      userEmail: user.email,
      actionDescription: `Updated pin status for product: ${result.name}`,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product pin status updated successfully",
    data: result,
  });
});

const updateProductPositions = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ProductServices.updateProductPositionsArray(
      req.body.orderedIds,
    );

    // Log action
    const user = (req as unknown as CustomRequest).user;
    if (user) {
      await ActivityLogService.createLog({
        userName: user.name,
        userEmail: user.email,
        actionDescription: "Reordered product positions",
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product positions updated successfully",
      data: result,
    });
  },
);

const uploadProductImage = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new AppError(httpStatus.BAD_REQUEST, "Image file is required");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product image uploaded successfully",
    data: { image: (req.file as any).path },
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getPinnedProducts,
  updateProductPin,
  updateProductPositions,
  uploadProductImage,
};
