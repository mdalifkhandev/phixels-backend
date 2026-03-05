import e from "express";
import { UserController } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import { UserCreatedValidation } from "./auth.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../Interface/types";

const router = e.Router();

router.post(
  "/signup",
  validateRequest(UserCreatedValidation.userCreatedValidationSchema),
  UserController.userCreated,
);
router.post("/login", UserController.userLogin);
router.post(
  "/verify",
  validateRequest(UserCreatedValidation.verifyEmailValidationSchema),
  UserController.verifyUserEmail,
);
router.post("/logout", UserController.logoutUser);
router.post(
  "/forgot-password",
  validateRequest(UserCreatedValidation.forgotPasswordValidationSchema),
  UserController.forgotPassword,
);
router.post(
  "/reset-password",
  validateRequest(UserCreatedValidation.resetPasswordValidationSchema),
  UserController.resetPassword,
);
router.patch(
  "/change-password",
  auth(USER_ROLE.admin),
  validateRequest(UserCreatedValidation.changePasswordValidationSchema),
  UserController.changePassword,
);

export const AuthRouter = router;
