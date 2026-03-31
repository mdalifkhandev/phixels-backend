import { z } from "zod";

const createProjectRequestValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }),
    phone: z.string({
      required_error: "Phone is required",
    }),
    country: z.string({
      required_error: "Country is required",
    }),
    budget: z.string().optional(),
    description: z.string().optional(),
    formType: z.string({
      required_error: "FormType is required",
    }),
    files: z.array(z.any()).optional(),
    status: z.enum(["Pending", "Confirmed"]).optional(),
    meetingDate: z.string().optional(),
    meetingTime: z.string().optional(),
    projectProgress: z.string().optional(),
    assignedTo: z.string().optional(),
    requestId: z.string({
      required_error: "RequestId is required",
    }),
  }),
});

const updateProjectRequestValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    country: z.string().optional(),
    budget: z.string().optional(),
    description: z.string().optional(),
    files: z.array(z.any()).optional(),
    status: z.enum(["Pending", "Confirmed"]).optional(),
    meetingDate: z.string().optional(),
    meetingTime: z.string().optional(),
    projectProgress: z.string().optional(),
    assignedTo: z.string().optional(),
    requestId: z.string().optional(),
    formType: z.string().optional(),
  }),
});

export const ProjectRequestValidation = {
  createProjectRequestValidationSchema,
  updateProjectRequestValidationSchema,
};
