import { z } from "zod";

const metricSchema = z.object({
  label: z.string({ required_error: "Label is required" }).trim().min(1),
  value: z.number({ required_error: "Value is required" }),
  suffix: z.string().default(""),
  iconKey: z.enum(["users", "download", "star", "trending-up"]).optional(),
});

const updatePageMetricsValidationSchema = z.object({
  body: z
    .object({
      homeHeroMetrics: z.array(metricSchema).length(2).optional(),
      servicesPageMetrics: z.array(metricSchema).length(4).optional(),
      productsPageMetrics: z
        .array(
          metricSchema.extend({
            iconKey: z.enum(["users", "download", "star", "trending-up"]),
          }),
        )
        .length(4)
        .optional(),
    })
    .refine((body) => Object.keys(body).length > 0, {
      message: "At least one metric group is required",
    }),
});

export const PageMetricsValidation = {
  updatePageMetricsValidationSchema,
};
