import { Router } from "express";
import { UserController } from "./user.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../Interface/types";

const router = Router();

router.get(
  "/",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  UserController.getUsers,
);
router.post(
  "/",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  UserController.createUser,
);
router.patch(
  "/:id",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  UserController.updateUser,
);
router.delete(
  "/:id",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  UserController.deleteUser,
);

export const UserRouter = router;
