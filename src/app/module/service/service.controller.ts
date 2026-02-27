import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ServiceServices } from './service.service';
import AppError from '../../error/appError';

const createService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceServices.createServiceIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service created successfully',
    data: result,
  });
});

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceServices.getAllServicesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services retrieved successfully',
    data: result,
  });
});

const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceServices.getSingleServiceFromDB(id as string);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service retrieved successfully',
    data: result,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceServices.updateServiceInDB(id as string, req.body);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service updated successfully',
    data: result,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceServices.deleteServiceFromDB(id as string);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service deleted successfully',
    data: result,
  });
});

const getServiceMenu = catchAsync(async (_req: Request, res: Response) => {
  const result = await ServiceServices.getServiceMenuFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service menu retrieved successfully',
    data: result,
  });
});

const createServiceCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceServices.createServiceCategoryIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service category created successfully',
    data: result,
  });
});

const getAllServiceCategories = catchAsync(async (_req: Request, res: Response) => {
  const result = await ServiceServices.getAllServiceCategoriesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service categories retrieved successfully',
    data: result,
  });
});

const getServiceCategoryBySlug = catchAsync(async (req: Request, res: Response) => {
  const { categorySlug } = req.params;
  const result = await ServiceServices.getServiceCategoryDetailBySlugFromDB(
    categorySlug as string,
  );
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service category not found');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service category retrieved successfully',
    data: result,
  });
});

const updateServiceCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceServices.updateServiceCategoryInDB(id as string, req.body);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service category not found');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service category updated successfully',
    data: result,
  });
});

const deleteServiceCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceServices.deleteServiceCategoryFromDB(id as string);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service category not found');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service category deleted successfully',
    data: result,
  });
});

const createServiceSubcategory = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceServices.createServiceSubcategoryIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service subcategory created successfully',
    data: result,
  });
});

const getAllServiceSubcategories = catchAsync(async (_req: Request, res: Response) => {
  const result = await ServiceServices.getAllServiceSubcategoriesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service subcategories retrieved successfully',
    data: result,
  });
});

const getServiceSubcategoryBySlugs = catchAsync(async (req: Request, res: Response) => {
  const { categorySlug, subcategorySlug } = req.params;
  const result = await ServiceServices.getServiceSubcategoryBySlugsFromDB(
    categorySlug as string,
    subcategorySlug as string,
  );
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service subcategory not found');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service subcategory retrieved successfully',
    data: result,
  });
});

const updateServiceSubcategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceServices.updateServiceSubcategoryInDB(id as string, req.body);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service subcategory not found');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service subcategory updated successfully',
    data: result,
  });
});

const deleteServiceSubcategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceServices.deleteServiceSubcategoryFromDB(id as string);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service subcategory not found');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service subcategory deleted successfully',
    data: result,
  });
});

const uploadServiceCategoryImage = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Image file is required');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service category image uploaded successfully',
    data: { image: (req.file as any).path },
  });
});

const reorderServiceCategories = catchAsync(async (req: Request, res: Response) => {
  const { orderedIds } = req.body;
  const result = await ServiceServices.reorderServiceCategoriesInDB(
    orderedIds as string[],
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service categories reordered successfully',
    data: result,
  });
});

const reorderServiceSubcategories = catchAsync(async (req: Request, res: Response) => {
  const { categoryId, orderedIds } = req.body;
  const result = await ServiceServices.reorderServiceSubcategoriesInDB(
    categoryId as string,
    orderedIds as string[],
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service subcategories reordered successfully',
    data: result,
  });
});

export const ServiceController = {
  getServiceMenu,
  createServiceCategory,
  getAllServiceCategories,
  getServiceCategoryBySlug,
  updateServiceCategory,
  deleteServiceCategory,
  createServiceSubcategory,
  getAllServiceSubcategories,
  getServiceSubcategoryBySlugs,
  updateServiceSubcategory,
  deleteServiceSubcategory,
  uploadServiceCategoryImage,
  reorderServiceCategories,
  reorderServiceSubcategories,
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
