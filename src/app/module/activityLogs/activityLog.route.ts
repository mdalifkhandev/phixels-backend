import { Router } from "express";
import { ActivityLogController } from "./activityLog.controller";

const router = Router();

router.get("/", ActivityLogController.getLogs);

export const ActivityLogRouter = router;
