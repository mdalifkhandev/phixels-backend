import { getFormalEmailHtml } from "../mails/utils";

export const getStep1ClientEmailTemplate = (name: string) => {
  const subject = "We've Received Your Project Request - Phixels.io";
  const text = `Hi ${name},\n\nThank you for reaching out to Phixels.io! We've successfully received your initial project details. Our team is already looking over your requirements.`;
  const details = `We noticed you haven't scheduled a consultation call yet. You can always come back to our site to book a time that works best for you, or wait for one of our experts to reach out manually.`;
  
  return {
    subject,
    html: getFormalEmailHtml(subject, text, details)
  };
};

export const getStep1AdminEmailTemplate = (data: any) => {
  const subject = `New Lead: ${data.name}`;
  const text = `A new project request has been submitted. The user has completed Step 1 but has not yet booked a meeting.`;
  const details = `
    <strong>Name:</strong> ${data.name}<br/>
    <strong>Email:</strong> ${data.email}<br/>
    <strong>Phone:</strong> ${data.phone}<br/>
    <strong>Country:</strong> ${data.country}<br/>
    <strong>Budget:</strong> ${data.budget || "N/A"}<br/>
    <strong>Description:</strong> ${data.description || "N/A"}
  `;

  return {
    subject,
    html: getFormalEmailHtml(subject, text, details),
  };
};

export const getStep2ClientEmailTemplate = (
  name: string,
  date: string,
  time: string,
) => {
  const subject = "Consultation Confirmed";
  const text = `Hi ${name}, your consultation call has been successfully scheduled. We're excited to discuss your project vision in detail.`;
  const details = `
    <strong>Meeting Date:</strong> ${date}<br/>
    <strong>Meeting Time:</strong> ${time}<br/><br/>
    <em>Please make sure to add this to your calendar. We will send you a meeting link shortly before the scheduled time.</em>
  `;

  return {
    subject,
    html: getFormalEmailHtml(subject, text, details),
  };
};

export const getStep2AdminEmailTemplate = (data: any) => {
  const subject = `Meeting Booked: ${data.name}`;
  const text = `User ${data.name} has completed the booking process and scheduled a consultation.`;
  const details = `
    <strong>Name:</strong> ${data.name}<br/>
    <strong>Email:</strong> ${data.email}<br/>
    <strong>Meeting:</strong> ${data.meetingDate} at ${data.meetingTime}<br/>
    <strong>Budget:</strong> ${data.budget || "N/A"}<br/>
    <strong>Description:</strong> ${data.description || "N/A"}
  `;
  
  return {
    subject,
    html: getFormalEmailHtml(subject, text, details)
  };
};
