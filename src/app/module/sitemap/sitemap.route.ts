import { Router } from "express";
import { SitemapController } from "./sitemap.controller";

const router = Router();

router.get("/sitemap.xml", SitemapController.generateSitemap);

export const SitemapRouter = router;
