import { Request, Response } from "express";
import { User } from "../authentication/auth.model";
import { UserService } from "./user.service";

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
      error,
    });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.createUser(req.body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to create user",
      error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const result = await UserService.updateUser(id, req.body);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to update user",
      error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await UserService.deleteUser(id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to delete user",
      error,
    });
  }
};

export const UserController = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
