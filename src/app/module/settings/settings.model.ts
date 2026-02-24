import { Schema, model } from 'mongoose';
import { TSettings } from './settings.interface';

const settingsSchema = new Schema<TSettings>(
  {
    notificationRecipients: {
      type: [String],
      default: ['phixels.io@gmail.com'],
    },
    alerts: {
      newLead: { type: Boolean, default: true },
      meetingBooked: { type: Boolean, default: true },
      contactMessages: { type: Boolean, default: true },
      newsletter: { type: Boolean, default: false },
      jobApplications: { type: Boolean, default: true },
    },
    account: {
      fullName: { type: String, default: 'Admin' },
      email: { type: String, default: 'admin@phixels.com' },
      twoFactorEnabled: { type: Boolean, default: false },
      passwordLastChangedAt: { type: Date, default: Date.now },
    },
  },
  {
    timestamps: true,
  },
);

export const SettingsModel = model<TSettings>('Setting', settingsSchema);

