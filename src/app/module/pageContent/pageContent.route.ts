import express from "express";
import { PageContentController } from "./pageContent.controller";

const router = express.Router();

router.get("/", PageContentController.getAllPageContent);
router.get("/:pageKey", PageContentController.getPageContent);
router.post("/", PageContentController.createOrUpdatePageContent);

export const PageContentRoutes = router;
