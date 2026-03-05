import httpStatus from "http-status";
import AppError from "../../error/appError";
import { User } from "../authentication/auth.model";
import bcrypt from "bcrypt";

const createUser = async (payload: any) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "User with this email already exists",
    );
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const newUser = await User.create({
    ...payload,
    password: hashedPassword,
    isVerified: true,
  });

  const userObject = newUser.toObject();
  Reflect.deleteProperty(userObject, "password");

  return userObject;
};

const updateUser = async (id: string, payload: any) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // Prevent password update through this generic route
  if (payload.password) {
    Reflect.deleteProperty(payload, "password");
  }

  const updatedUser = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).select("-password");

  return updatedUser;
};

const deleteUser = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  await User.findByIdAndDelete(id);
  return null;
};

export const UserService = {
  createUser,
  updateUser,
  deleteUser,
};
