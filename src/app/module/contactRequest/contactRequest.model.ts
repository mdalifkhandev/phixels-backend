import { Schema, model } from "mongoose";
import { TContactRequest } from "./contactRequest.interface";

const contactRequestSchema = new Schema<TContactRequest>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    message: { type: String, required: true },
    files: { type: [Schema.Types.Mixed], default: [] },
    status: {
      type: String,
      enum: ["Unread", "Read"],
      default: "Unread",
    },
    requestId: { type: String, required: true, unique: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

contactRequestSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

contactRequestSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const ContactRequestModel = model<TContactRequest>(
  "ContactRequest",
  contactRequestSchema,
);

