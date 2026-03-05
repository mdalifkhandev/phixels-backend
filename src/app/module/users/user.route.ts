import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.get("/", UserController.getUsers);
router.post("/", UserController.createUser);
router.patch("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export const UserRouter = router;
