import { z } from "zod";

const createNewsletterSubscriptionValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
    }).email("Invalid email address"),
    requestId: z.string({
      required_error: "Request ID is required",
    }),
  }),
});

export const NewsletterSubscriptionValidation = {
  createNewsletterSubscriptionValidationSchema,
};

