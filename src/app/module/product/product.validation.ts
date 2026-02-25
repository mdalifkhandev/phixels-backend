import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    description: z.string({ required_error: 'Description is required' }),
    features: z.array(z.string()).optional(),
    pricing: z.number({ required_error: 'Pricing is required' }),
    demoLink: z.string().optional(),
    images: z.array(z.string()).optional(),
    category: z.string({ required_error: 'Category is required' }),
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
    isPinned: z.boolean().optional(),
    pinOrder: z.union([z.literal(1), z.literal(2), z.literal(3), z.null()]).optional(),
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

export const ProductValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
  updateProductPinValidationSchema,
};
