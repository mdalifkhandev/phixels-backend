import express from 'express';
import { upload } from '../../utils/upload.utils';
import { UploadController } from './upload.controller';

const router = express.Router();

router.post(
  '/',
  upload.array('files'),
  UploadController.uploadFiles
);

export const UploadRouter = router;
