import express from "express";
import { AboutContentControllers } from "./aboutContent.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../Interface/types";
import { upload } from "../../utils/upload.utils";

const router = express.Router();

// Public route to get the about content
router.get("/", AboutContentControllers.getAboutContent);

router.post(
  "/upload-image",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  upload.single("image"),
  AboutContentControllers.uploadAboutContentImage,
);

// Protected route to update the about content
router.put(
  "/",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  AboutContentControllers.updateAboutContent,
);

export const AboutContentRoutes = router;
