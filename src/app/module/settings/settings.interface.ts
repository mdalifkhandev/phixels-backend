export type TSettings = {
  notificationRecipients: string[];
  alerts: {
    newLead: boolean;
    meetingBooked: boolean;
    contactMessages: boolean;
    newsletter: boolean;
    jobApplications: boolean;
  };
};
