import { Router } from "express";
import { ActivityLogController } from "./activityLog.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../Interface/types";

const router = Router();

router.get(
  "/",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  ActivityLogController.getLogs,
);

export const ActivityLogRouter = router;
