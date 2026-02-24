import { z } from 'zod';

const createReviewValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    role: z.string({ required_error: 'Role is required' }),
    image: z.string({ required_error: 'Image is required' }),
    rating: z.number({ required_error: 'Rating is required' }).min(1).max(5),
    review: z.string({ required_error: 'Review is required' }),
    project: z.string({ required_error: 'Project is required' }),
    budget: z.string({ required_error: 'Budget is required' }),
    duration: z.string({ required_error: 'Duration is required' }),
    summary: z.string({ required_error: 'Summary is required' }),
  }),
});

const updateReviewValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    role: z.string().optional(),
    image: z.string().optional(),
    rating: z.number().min(1).max(5).optional(),
    review: z.string().optional(),
    project: z.string().optional(),
    budget: z.string().optional(),
    duration: z.string().optional(),
    summary: z.string().optional(),
  }),
});

export const ReviewValidation = {
  createReviewValidationSchema,
  updateReviewValidationSchema,
};

