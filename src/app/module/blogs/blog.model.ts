import { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    writer: {
        type: String,
        required: true
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    readingTime: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    categoryName: {
        type: String,
        default: 'Uncategorized'
    },
    slug: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        sparse: true,
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft',
    },
    serviceId: {
        type: String,
        default: '',
    },
    authorId: {
        type: String,
        default: '',
    },
    icon: {
        type: String,
        default: '',
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    featuredOrder: {
        type: Number,
        default: null,
    },
    position: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
});

blogSchema.index({ slug: 1 }, { unique: true, sparse: true });
blogSchema.index({ status: 1 });
blogSchema.index({ isFeatured: 1, featuredOrder: 1 });

export const Blog = model<TBlog>('Blog', blogSchema);
