import { ContactRequestModel } from "./contactRequest.model";
import { TContactRequest } from "./contactRequest.interface";
import { SendMail, getAdminContactEmailHtml, getUserContactEmailHtml } from "../mails/utils";

const createContactRequestIntoDB = async (payload: TContactRequest) => {
  const result = await ContactRequestModel.create(payload);
  
  // Send Email to Admin asynchronously
  SendMail({
    to: "phixels.io@gmail.com",
    subject: `New Contact Request: ${payload.name}`,
    html: getAdminContactEmailHtml(payload),
  }).catch((err) => console.error("Error sending admin contact email:", err));

  // Send Email to User asynchronously
  SendMail({
    to: payload.email,
    subject: "Thank You For Contacting Us",
    html: getUserContactEmailHtml(payload),
  }).catch((err) => console.error("Error sending user contact email:", err));

  return result;
};

const getAllContactRequestsFromDB = async () => {
  const result = await ContactRequestModel.find().sort("-createdAt");
  return result;
};

const getSingleContactRequestFromDB = async (id: string) => {
  const result = await ContactRequestModel.findById(id);
  return result;
};

const updateContactRequestIntoDB = async (id: string, payload: Partial<TContactRequest>) => {
  const result = await ContactRequestModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteContactRequestFromDB = async (id: string) => {
  const result = await ContactRequestModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const ContactRequestService = {
  createContactRequestIntoDB,
  getAllContactRequestsFromDB,
  getSingleContactRequestFromDB,
  updateContactRequestIntoDB,
  deleteContactRequestFromDB,
};

