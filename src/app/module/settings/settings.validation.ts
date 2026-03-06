import { z } from "zod";

const updateSettingsValidationSchema = z.object({
  body: z.object({
    notificationRecipients: z.array(z.string().email()).optional(),
    alerts: z
      .object({
        newLead: z.boolean().optional(),
        meetingBooked: z.boolean().optional(),
        contactMessages: z.boolean().optional(),
        newsletter: z.boolean().optional(),
        jobApplications: z.boolean().optional(),
      })
      .optional(),
  }),
});

export const SettingsValidation = {
  updateSettingsValidationSchema,
};
