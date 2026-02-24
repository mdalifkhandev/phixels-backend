import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { ServiceController } from './service.controller';
import { ServiceValidation } from './service.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../../Interface/types';

const router = Router();

// Public dynamic menu/category/subcategory routes
router.get('/menu', ServiceController.getServiceMenu);
router.get('/categories', ServiceController.getAllServiceCategories);
router.get('/categories/:categorySlug', ServiceController.getServiceCategoryBySlug);
router.get(
  '/categories/:categorySlug/subcategories/:subcategorySlug',
  ServiceController.getServiceSubcategoryBySlugs,
);

// Admin category routes
router.post(
  '/categories',
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidation.createServiceCategoryValidationSchema),
  ServiceController.createServiceCategory,
);

router.patch(
  '/categories/:id',
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidation.updateServiceCategoryValidationSchema),
  ServiceController.updateServiceCategory,
);

router.delete(
  '/categories/:id',
  auth(USER_ROLE.admin),
  ServiceController.deleteServiceCategory,
);

// Admin subcategory routes
router.post(
  '/subcategories',
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidation.createServiceSubcategoryValidationSchema),
  ServiceController.createServiceSubcategory,
);

router.get(
  '/subcategories',
  auth(USER_ROLE.admin),
  ServiceController.getAllServiceSubcategories,
);

router.patch(
  '/subcategories/:id',
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidation.updateServiceSubcategoryValidationSchema),
  ServiceController.updateServiceSubcategory,
);

router.delete(
  '/subcategories/:id',
  auth(USER_ROLE.admin),
  ServiceController.deleteServiceSubcategory,
);

// Legacy routes (kept for compatibility)
router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidation.createServiceValidationSchema),
  ServiceController.createService,
);

router.get('/', ServiceController.getAllServices);

router.get('/:id', ServiceController.getSingleService);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidation.updateServiceValidationSchema),
  ServiceController.updateService,
);

router.delete('/:id', auth(USER_ROLE.admin), ServiceController.deleteService);

export const ServiceRouter = router;
