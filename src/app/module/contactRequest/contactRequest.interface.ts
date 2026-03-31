import { Types } from "mongoose";

export type TContactRequest = {
  name: string;
  email: string;
  phone: string;
  country: string;
  message: string;
  files?: any[];
  status: "Unread" | "Read";
  requestId: string;
  isDeleted: boolean;
};

