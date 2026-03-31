import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { NewsletterSubscriptionController } from "./newsletterSubscription.controller";
import { NewsletterSubscriptionValidation } from "./newsletterSubscription.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(NewsletterSubscriptionValidation.createNewsletterSubscriptionValidationSchema),
  NewsletterSubscriptionController.createNewsletterSubscription,
);

router.get("/", NewsletterSubscriptionController.getAllNewsletterSubscriptions);

router.delete("/:id", NewsletterSubscriptionController.deleteNewsletterSubscription);

export const NewsletterSubscriptionRoutes = router;

