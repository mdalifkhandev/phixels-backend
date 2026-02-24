import { TSettings } from './settings.interface';
import { SettingsModel } from './settings.model';

const defaultSettings = {
  notificationRecipients: ['phixels.io@gmail.com'],
  alerts: {
    newLead: true,
    meetingBooked: true,
    contactMessages: true,
    newsletter: false,
    jobApplications: true,
  },
  account: {
    fullName: 'Admin',
    email: 'admin@phixels.com',
    twoFactorEnabled: false,
    passwordLastChangedAt: new Date(),
  },
};

const getSettingsFromDB = async () => {
  let settings = await SettingsModel.findOne();
  if (!settings) {
    settings = await SettingsModel.create(defaultSettings);
  }
  return settings;
};

const updateSettingsInDB = async (payload: Partial<TSettings>) => {
  const existing = await getSettingsFromDB();
  const mergedPayload = {
    notificationRecipients:
      payload.notificationRecipients ?? existing.notificationRecipients,
    alerts: {
      ...existing.alerts,
      ...(payload.alerts ?? {}),
    },
    account: {
      ...existing.account,
      ...(payload.account ?? {}),
    },
  };

  const result = await SettingsModel.findByIdAndUpdate(
    existing._id,
    mergedPayload,
    { new: true },
  );
  return result;
};

export const SettingsServices = {
  getSettingsFromDB,
  updateSettingsInDB,
};

