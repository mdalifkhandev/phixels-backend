import express from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { USER_ROLE } from '../../Interface/types';
import { SettingsController } from './settings.controller';
import { SettingsValidation } from './settings.validation';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin), SettingsController.getSettings);

router.patch(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(SettingsValidation.updateSettingsValidationSchema),
  SettingsController.updateSettings,
);

export const SettingsRouter = router;

