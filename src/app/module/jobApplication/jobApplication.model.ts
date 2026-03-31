import { Schema, model } from "mongoose";
import { TJobApplication } from "./jobApplication.interface";

const jobApplicationSchema = new Schema<TJobApplication>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    portfolio: { type: String },
    jobTitle: { type: String, required: true },
    resumeUrl: { type: String, required: true },
    status: {
      type: String,
      enum: ["New", "Reviewing", "Shortlisted", "Rejected"],
      default: "New",
    },
    requestId: { type: String, required: true, unique: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

jobApplicationSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

jobApplicationSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const JobApplicationModel = model<TJobApplication>(
  "JobApplication",
  jobApplicationSchema,
);

