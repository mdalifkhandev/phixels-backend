import { model, Schema } from 'mongoose';
import { TAuthor } from './author.interface';

const authorSchema = new Schema<TAuthor>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    profileImage: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);

export const AuthorModel = model<TAuthor>('Author', authorSchema);
