import express from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { USER_ROLE } from '../../Interface/types';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';
import { upload } from '../../utils/upload.utils';

const router = express.Router();

router.post(
  '/upload-image',
  auth(USER_ROLE.admin),
  upload.single('image'),
  ReviewController.uploadReviewImage,
);

router.post(
  '/',
  auth(USER_ROLE.admin),
  upload.single('image'),
  (req, _res, next) => {
    if (req.file) {
      req.body.image = (req.file as any).path;
    }
    for (const key in req.body) {
      try {
        req.body[key] = JSON.parse(req.body[key]);
      } catch {
        req.body[key] = req.body[key];
      }
    }
    next();
  },
  validateRequest(ReviewValidation.createReviewValidationSchema),
  ReviewController.createReview,
);

router.get('/', ReviewController.getAllReviews);

router.patch(
  '/reorder',
  auth(USER_ROLE.admin),
  validateRequest(ReviewValidation.updateReviewPositionsValidationSchema),
  ReviewController.updateReviewPositions,
);

router.get('/:id', ReviewController.getSingleReview);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  upload.single('image'),
  (req, _res, next) => {
    if (req.file) {
      req.body.image = (req.file as any).path;
    }
    for (const key in req.body) {
      try {
        req.body[key] = JSON.parse(req.body[key]);
      } catch {
        req.body[key] = req.body[key];
      }
    }
    next();
  },
  validateRequest(ReviewValidation.updateReviewValidationSchema),
  ReviewController.updateReview,
);

router.delete('/:id', auth(USER_ROLE.admin), ReviewController.deleteReview);

export const ReviewRouter = router;
