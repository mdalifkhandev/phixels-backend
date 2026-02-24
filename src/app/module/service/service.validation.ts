import { z } from 'zod';

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const iconKeys = [
  'code',
  'smartphone',
  'globe',
  'cpu',
  'palette',
  'bar-chart',
  'shield',
  'cloud',
  'zap',
  'blocks',
  'building2',
  'brain',
] as const;

const seoSchema = z
  .object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    ogImage: z.string().optional(),
  })
  .optional();

const faqSchema = z.object({
  question: z.string({ required_error: 'FAQ question is required' }),
  answer: z.string({ required_error: 'FAQ answer is required' }),
});

const ctaSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    buttonText: z.string().optional(),
  })
  .optional();

const createServiceValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    description: z.string({ required_error: 'Description is required' }),
    icon: z.string({ required_error: 'Icon is required' }),
    features: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
  }),
});

const updateServiceValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
    features: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
  }),
});

const createServiceCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    slug: z
      .string({ required_error: 'Slug is required' })
      .regex(slugRegex, 'Slug must be lowercase and hyphen-separated'),
    description: z.string({ required_error: 'Description is required' }),
    iconKey: z.enum(iconKeys, { required_error: 'Icon key is required' }),
    heroImage: z.string().optional(),
    bannerImage: z.string().optional(),
    sortOrder: z.number().min(0).optional(),
    isActive: z.boolean().optional(),
    seo: seoSchema,
  }),
});

const updateServiceCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    slug: z
      .string()
      .regex(slugRegex, 'Slug must be lowercase and hyphen-separated')
      .optional(),
    description: z.string().optional(),
    iconKey: z.enum(iconKeys).optional(),
    heroImage: z.string().optional(),
    bannerImage: z.string().optional(),
    sortOrder: z.number().min(0).optional(),
    isActive: z.boolean().optional(),
    seo: seoSchema,
  }),
});

const createServiceSubcategoryValidationSchema = z.object({
  body: z.object({
    categoryId: z.string({ required_error: 'Category ID is required' }),
    name: z.string({ required_error: 'Name is required' }),
    slug: z
      .string({ required_error: 'Slug is required' })
      .regex(slugRegex, 'Slug must be lowercase and hyphen-separated'),
    shortDescription: z.string({
      required_error: 'Short description is required',
    }),
    longDescription: z.string().optional(),
    coverImage: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    keyFeatures: z.array(z.string()).optional(),
    techStack: z.array(z.string()).optional(),
    processSteps: z.array(z.string()).optional(),
    faq: z.array(faqSchema).optional(),
    cta: ctaSchema,
    sortOrder: z.number().min(0).optional(),
    isActive: z.boolean().optional(),
    seo: seoSchema,
  }),
});

const updateServiceSubcategoryValidationSchema = z.object({
  body: z.object({
    categoryId: z.string().optional(),
    name: z.string().optional(),
    slug: z
      .string()
      .regex(slugRegex, 'Slug must be lowercase and hyphen-separated')
      .optional(),
    shortDescription: z.string().optional(),
    longDescription: z.string().optional(),
    coverImage: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    keyFeatures: z.array(z.string()).optional(),
    techStack: z.array(z.string()).optional(),
    processSteps: z.array(z.string()).optional(),
    faq: z.array(faqSchema).optional(),
    cta: ctaSchema,
    sortOrder: z.number().min(0).optional(),
    isActive: z.boolean().optional(),
    seo: seoSchema,
  }),
});

export const ServiceValidation = {
  createServiceValidationSchema,
  updateServiceValidationSchema,
  createServiceCategoryValidationSchema,
  updateServiceCategoryValidationSchema,
  createServiceSubcategoryValidationSchema,
  updateServiceSubcategoryValidationSchema,
};
