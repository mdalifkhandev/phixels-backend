import { model, Schema } from "mongoose";
import { TActivityLog } from "./activityLog.interface";

const activityLogSchema = new Schema<TActivityLog>(
  {
    userName: {
      type: String,
      required: true,
      default: "Public Visitor",
    },
    userEmail: {
      type: String,
      required: true,
      default: "visitor@phixels.com",
    },
    actionDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const ActivityLog = model("ActivityLog", activityLogSchema);
