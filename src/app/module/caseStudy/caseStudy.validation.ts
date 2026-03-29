import { z } from "zod";

const createCaseStudyValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }),
    client: z.string({ required_error: "Client is required" }),
    category: z.string({ required_error: "Category is required" }),
    challenge: z.string({ required_error: "Challenge is required" }),
    solution: z.string({ required_error: "Solution is required" }),
    result: z.string({ required_error: "Result is required" }),
    image: z.string({ required_error: "Image is required" }),
    link: z
      .string()
      .optional()
      .refine(
        (val) =>
          !val || val.trim() === "" || z.string().url().safeParse(val).success,
        { message: "Invalid URL" },
      ),
    serviceId: z.string().optional(),
    icon: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

const updateCaseStudyValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    client: z.string().optional(),
    category: z.string().optional(),
    challenge: z.string().optional(),
    solution: z.string().optional(),
    result: z.string().optional(),
    image: z.string().optional(),
    link: z
      .string()
      .optional()
      .refine(
        (val) =>
          !val || val.trim() === "" || z.string().url().safeParse(val).success,
        { message: "Invalid URL" },
      ),
    serviceId: z.string().optional(),
    icon: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

const reorderCaseStudyValidationSchema = z.object({
  body: z.object({
    orderedIds: z.array(z.string()),
  }),
});

export const CaseStudyValidation = {
  createCaseStudyValidationSchema,
  updateCaseStudyValidationSchema,
  reorderCaseStudyValidationSchema,
};
