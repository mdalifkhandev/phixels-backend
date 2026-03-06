import { Schema, model } from "mongoose";
import { TSettings } from "./settings.interface";

const settingsSchema = new Schema<TSettings>(
  {
    notificationRecipients: {
      type: [String],
      default: ["phixels.io@gmail.com"],
    },
    alerts: {
      newLead: { type: Boolean, default: true },
      meetingBooked: { type: Boolean, default: true },
      contactMessages: { type: Boolean, default: true },
      newsletter: { type: Boolean, default: false },
      jobApplications: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
  },
);

export const SettingsModel = model<TSettings>("Setting", settingsSchema);
