import { z } from "zod";

const createJobApplicationValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }).email("Invalid email address"),
    portfolio: z.string().optional(),
    jobTitle: z.string({
      required_error: "Job Title is required",
    }),
    resumeUrl: z.string({
      required_error: "Resume URL is required",
    }),
    requestId: z.string({
      required_error: "Request ID is required",
    }),
  }),
});

const updateJobApplicationValidationSchema = z.object({
  body: z.object({
    status: z.enum(["New", "Reviewing", "Shortlisted", "Rejected"]).optional(),
  }),
});

export const JobApplicationValidation = {
  createJobApplicationValidationSchema,
  updateJobApplicationValidationSchema,
};

