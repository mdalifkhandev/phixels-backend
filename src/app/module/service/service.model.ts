import { Schema, model } from 'mongoose';
import {
  TService,
  TServiceCategory,
  TServiceSubcategory,
} from './service.interface';

const serviceSchema = new Schema<TService>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    features: { type: [String], default: [] },
    images: { type: [String], default: [] },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// Query Middleware to hide deleted documents
serviceSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

serviceSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const ServiceModel = model<TService>('Service', serviceSchema);

const serviceCategorySchema = new Schema<TServiceCategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
    iconKey: { type: String, required: true, trim: true },
    heroImage: { type: String, default: '' },
    bannerImage: { type: String, default: '' },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    seo: {
      metaTitle: { type: String, default: '' },
      metaDescription: { type: String, default: '' },
      ogImage: { type: String, default: '' },
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

serviceCategorySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

serviceCategorySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

const serviceSubcategorySchema = new Schema<TServiceSubcategory>(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'ServiceCategory',
      required: true,
    },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true, trim: true },
    longDescription: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    gallery: { type: [String], default: [] },
    keyFeatures: { type: [String], default: [] },
    techStack: { type: [String], default: [] },
    processSteps: { type: [String], default: [] },
    faq: {
      type: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
        },
      ],
      default: [],
    },
    cta: {
      title: { type: String, default: '' },
      description: { type: String, default: '' },
      buttonText: { type: String, default: '' },
    },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    seo: {
      metaTitle: { type: String, default: '' },
      metaDescription: { type: String, default: '' },
      ogImage: { type: String, default: '' },
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

serviceSubcategorySchema.index({ categoryId: 1, slug: 1 }, { unique: true });

serviceSubcategorySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

serviceSubcategorySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const ServiceCategoryModel = model<TServiceCategory>(
  'ServiceCategory',
  serviceCategorySchema,
);

export const ServiceSubcategoryModel = model<TServiceSubcategory>(
  'ServiceSubcategory',
  serviceSubcategorySchema,
);
