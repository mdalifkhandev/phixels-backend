import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { JobApplicationController } from "./jobApplication.controller";
import { JobApplicationValidation } from "./jobApplication.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(JobApplicationValidation.createJobApplicationValidationSchema),
  JobApplicationController.createJobApplication,
);

router.get("/", JobApplicationController.getAllJobApplications);

router.patch(
  "/:id",
  validateRequest(JobApplicationValidation.updateJobApplicationValidationSchema),
  JobApplicationController.updateJobApplication,
);

router.delete("/:id", JobApplicationController.deleteJobApplication);

export const JobApplicationRoutes = router;

