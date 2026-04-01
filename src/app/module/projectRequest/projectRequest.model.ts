import { Schema, model } from "mongoose";
import { TProjectRequest } from "./projectRequest.interface";

const projectRequestSchema = new Schema<TProjectRequest>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    budget: { type: String },
    description: { type: String },
    formType: { type: String, required: true },
    files: { type: [Schema.Types.Mixed], default: [] },
    status: {
      type: String,
      enum: ["Pending", "Confirmed"],
      default: "Pending",
    },
    meetingDate: { type: String },
    meetingTime: { type: String },
    projectProgress: { type: String, default: "New" },
    assignedTo: { type: String, default: "Unassigned" },
    requestId: { type: String, required: true },
    isStep1EmailSent: { type: Boolean, default: false },
    isStep2EmailSent: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// Query Middleware to hide deleted documents
projectRequestSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

projectRequestSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const ProjectRequestModel = model<TProjectRequest>(
  "ProjectRequest",
  projectRequestSchema,
);
