import mongoose from "mongoose";
import { TAuthor } from "./author.interface";
import { AuthorModel } from "./author.model";

const createAuthorIntoDB = async (payload: TAuthor) => {
  return AuthorModel.create(payload);
};

const getAllAuthorsFromDB = async () => {
  return AuthorModel.find().sort({ createdAt: -1 });
};

const deleteAuthorFromDB = async (id: string) => {
  if (!mongoose.isValidObjectId(id)) return null;
  return AuthorModel.findByIdAndDelete(id);
};

export const AuthorServices = {
  createAuthorIntoDB,
  getAllAuthorsFromDB,
  deleteAuthorFromDB,
};
