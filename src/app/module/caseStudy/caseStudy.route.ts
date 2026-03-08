import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { CaseStudyController } from "./caseStudy.controller";
import { CaseStudyValidation } from "./caseStudy.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../Interface/types";
import { upload } from "../../utils/upload.utils";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(CaseStudyValidation.createCaseStudyValidationSchema),
  CaseStudyController.createCaseStudy,
);

router.get("/", CaseStudyController.getAllCaseStudies);

router.get("/:id", CaseStudyController.getSingleCaseStudy);

router.patch(
  "/reorder",
  auth(USER_ROLE.admin),
  validateRequest(CaseStudyValidation.reorderCaseStudyValidationSchema),
  CaseStudyController.reorderCaseStudy,
);

router.post(
  "/upload-image",
  auth(USER_ROLE.admin),
  upload.single("image"),
  CaseStudyController.uploadCaseStudyImage,
);

router.patch(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(CaseStudyValidation.updateCaseStudyValidationSchema),
  CaseStudyController.updateCaseStudy,
);

router.delete(
  "/:id",
  auth(USER_ROLE.admin),
  CaseStudyController.deleteCaseStudy,
);

export const CaseStudyRouter = router;
