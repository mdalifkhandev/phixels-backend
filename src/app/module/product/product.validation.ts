import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    description: z.string({ required_error: 'Description is required' }),
    features: z.array(z.string()).optional(),
    pricing: z.number().optional(),
    demoLink: z.string().optional(),
    images: z.array(z.string()).optional(),
    category: z.string({ required_error: 'Category is required' }),
    reviewRating: z.number().min(0).max(5).nullable().optional(),
    userCount: z.number().min(0).nullable().optional(),
    downloadsEnabled: z.boolean().optional(),
    downloadCount: z.number().min(0).nullable().optional(),
    position: z.number().optional(),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    features: z.array(z.string()).optional(),
    pricing: z.number().optional(),
    demoLink: z.string().optional(),
    images: z.array(z.string()).optional(),
    category: z.string().optional(),
    reviewRating: z.number().min(0).max(5).nullable().optional(),
    userCount: z.number().min(0).nullable().optional(),
    downloadsEnabled: z.boolean().optional(),
    downloadCount: z.number().min(0).nullable().optional(),
    isPinned: z.boolean().optional(),
    pinOrder: z.union([z.literal(1), z.literal(2), z.literal(3), z.null()]).optional(),
    position: z.number().optional(),
  }),
});

const updateProductPinValidationSchema = z.object({
  body: z
    .object({
      isPinned: z.boolean({ required_error: 'isPinned is required' }),
      pinOrder: z.union([z.literal(1), z.literal(2), z.literal(3), z.null()]).optional(),
    })
    .superRefine((data, ctx) => {
      if (data.isPinned && data.pinOrder == null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'pinOrder is required when isPinned is true',
          path: ['pinOrder'],
        });
      }
      if (!data.isPinned && data.pinOrder !== undefined && data.pinOrder !== null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'pinOrder must be null when isPinned is false',
          path: ['pinOrder'],
        });
      }
    }),
});

const updateProductPositionsValidationSchema = z.object({
  body: z.object({
    orderedIds: z.array(z.string({ required_error: 'orderedIds array of strings is required' })),
  }),
});

export const ProductValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
  updateProductPinValidationSchema,
  updateProductPositionsValidationSchema,
};
