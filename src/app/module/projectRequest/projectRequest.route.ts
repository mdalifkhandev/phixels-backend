import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { ProjectRequestController } from "./projectRequest.controller";
import { ProjectRequestValidation } from "./projectRequest.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../Interface/types";

const router = Router();

router.post(
  "/",
  validateRequest(
    ProjectRequestValidation.createProjectRequestValidationSchema,
  ),
  ProjectRequestController.createProjectRequest,
);

router.get(
  "/",
  auth(USER_ROLE.admin),
  ProjectRequestController.getAllProjectRequests,
);

router.get(
  "/:id",
  auth(USER_ROLE.admin),
  ProjectRequestController.getSingleProjectRequest,
);

router.patch(
  "/:id",
  validateRequest(
    ProjectRequestValidation.updateProjectRequestValidationSchema,
  ),
  ProjectRequestController.updateProjectRequest,
);

router.delete(
  "/:id",
  auth(USER_ROLE.admin),
  ProjectRequestController.deleteProjectRequest,
);

export const ProjectRequestRouter = router;
