import { z } from "zod";

const socialLinksSchema = z
  .object({
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    github: z.string().optional(),
  })
  .optional();

const createTeamMemberValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    role: z.string({ required_error: "Role is required" }),
    image: z.string().optional(),
    socialLinks: socialLinksSchema,
    sortOrder: z.number().optional(),
    isActive: z.boolean().optional(),
  }),
});

const updateTeamMemberValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    role: z.string().optional(),
    image: z.string().optional(),
    socialLinks: socialLinksSchema,
    sortOrder: z.number().optional(),
    isActive: z.boolean().optional(),
  }),
});

const updateTeamMemberPositionsValidationSchema = z.object({
  body: z.object({
    orderedIds: z.array(
      z.string({ required_error: "orderedIds array of strings is required" }),
    ),
  }),
});

export const TeamMemberValidation = {
  createTeamMemberValidationSchema,
  updateTeamMemberValidationSchema,
  updateTeamMemberPositionsValidationSchema,
};
