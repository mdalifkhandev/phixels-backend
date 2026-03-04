import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    features: { type: [String], default: [] },
    pricing: { type: Number, default: 0 },
    demoLink: { type: String },
    images: { type: [String], default: [] },
    category: { type: String, required: true },
    reviewRating: { type: Number, default: null },
    userCount: { type: Number, default: null },
    downloadsEnabled: { type: Boolean, default: false },
    downloadCount: { type: Number, default: null },
    isPinned: { type: Boolean, default: false },
    pinOrder: { type: Number, enum: [1, 2, 3], default: null },
    position: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// Query Middleware to hide deleted documents
productSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const ProductModel = model<TProduct>('Product', productSchema);
