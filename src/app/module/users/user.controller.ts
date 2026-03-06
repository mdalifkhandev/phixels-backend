import { Request, Response } from "express";
import { User as UserModel } from "../authentication/auth.model";
import { UserService } from "./user.service";
import { ActivityLogService } from "../activityLogs/activityLog.service";
import { CustomRequest } from "../../Interface/request";

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find().select("-password");
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

    // Log action
    const user = (req as unknown as CustomRequest).user;
    if (user) {
      await ActivityLogService.createLog({
        userName: user.name,
        userEmail: user.email,
        actionDescription: `Created a new user: ${result.name} (${result.email})`,
      });
    }

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

    // Log action
    const user = (req as unknown as CustomRequest).user;
    if (user && result) {
      await ActivityLogService.createLog({
        userName: user.name,
        userEmail: user.email,
        actionDescription: `Updated user: ${result.name} (${result.email})`,
      });
    }

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

    // Log action
    const user = (req as unknown as CustomRequest).user;
    if (user) {
      await ActivityLogService.createLog({
        userName: user.name,
        userEmail: user.email,
        actionDescription: `Deleted user with ID: ${id}`,
      });
    }

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
