import express from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../../Interface/types";
import { upload } from "../../utils/upload.utils";
import { TeamMemberController } from "./teamMember.controller";
import { TeamMemberValidation } from "./teamMember.validation";

const parseBody = (
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction,
) => {
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
};

const router = express.Router();

router.post(
  "/upload-image",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  upload.single("image"),
  TeamMemberController.uploadTeamMemberImage,
);

router.post(
  "/",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  upload.single("image"),
  parseBody,
  validateRequest(TeamMemberValidation.createTeamMemberValidationSchema),
  TeamMemberController.createTeamMember,
);

router.get("/", TeamMemberController.getAllTeamMembers);

router.patch(
  "/reorder",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(
    TeamMemberValidation.updateTeamMemberPositionsValidationSchema,
  ),
  TeamMemberController.updateTeamMemberPositions,
);

router.get("/:id", TeamMemberController.getSingleTeamMember);

router.patch(
  "/:id",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  upload.single("image"),
  parseBody,
  validateRequest(TeamMemberValidation.updateTeamMemberValidationSchema),
  TeamMemberController.updateTeamMember,
);

router.delete(
  "/:id",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  TeamMemberController.deleteTeamMember,
);

export const TeamMemberRouter = router;
