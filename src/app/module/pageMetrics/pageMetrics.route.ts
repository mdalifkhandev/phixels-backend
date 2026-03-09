import express from "express";
import { PageMetricsControllers } from "./pageMetrics.controller";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../../Interface/types";
import { PageMetricsValidation } from "./pageMetrics.validation";

const router = express.Router();

router.get("/", PageMetricsControllers.getPageMetrics);

router.put(
  "/",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(PageMetricsValidation.updatePageMetricsValidationSchema),
  PageMetricsControllers.updatePageMetrics,
);

export const PageMetricsRoutes = router;
