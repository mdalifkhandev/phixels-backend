import express from "express";
import { AuthorController } from "./author.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../Interface/types";
import { upload } from "../../utils/upload.utils";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  upload.single("image"),
  (req, _res, next) => {
    if (req.file) {
      req.body.profileImage = (req.file as any).path;
    }
    for (const key in req.body) {
      if (req.body[key]) {
        try {
          // Only parse if it looks like JSON array/object to avoid breaking plain strings
          if (
            (req.body[key].startsWith("{") && req.body[key].endsWith("}")) ||
            (req.body[key].startsWith("[") && req.body[key].endsWith("]"))
          ) {
            req.body[key] = JSON.parse(req.body[key]);
          }
        } catch {
          // If parse fails, leave it as is
        }
      }
    }
    next();
  },
  AuthorController.createAuthor,
);

router.get("/", AuthorController.getAllAuthors);

router.delete("/:id", auth(USER_ROLE.admin), AuthorController.deleteAuthor);

export const AuthorRouter = router;
