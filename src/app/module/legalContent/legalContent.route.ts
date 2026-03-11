import express from "express";
import { LegalContentControllers } from "./legalContent.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../Interface/types";

const router = express.Router();

router.get("/", LegalContentControllers.getLegalContent);

router.patch(
  "/",
  auth(USER_ROLE.admin),
  LegalContentControllers.updateLegalContent,
);

export const LegalContentRoutes = router;
