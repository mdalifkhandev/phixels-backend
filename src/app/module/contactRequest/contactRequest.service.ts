import { ContactRequestModel } from "./contactRequest.model";
import { TContactRequest } from "./contactRequest.interface";

const createContactRequestIntoDB = async (payload: TContactRequest) => {
  const result = await ContactRequestModel.create(payload);
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

