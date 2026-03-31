import { z } from "zod";

const createContactRequestValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }).email("Invalid email address"),
    phone: z.string({
      required_error: "Phone is required",
    }),
    country: z.string({
      required_error: "Country is required",
    }),
    message: z.string({
      required_error: "Message is required",
    }),
    files: z.array(z.any()).optional(),
    requestId: z.string({
      required_error: "Request ID is required",
    }),
  }),
});

const updateContactRequestValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    country: z.string().optional(),
    message: z.string().optional(),
    files: z.array(z.any()).optional(),
    status: z.enum(["Unread", "Read"]).optional(),
  }),
});

export const ContactRequestValidation = {
  createContactRequestValidationSchema,
  updateContactRequestValidationSchema,
};

