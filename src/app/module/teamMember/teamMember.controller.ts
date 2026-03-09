import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TeamMemberServices } from "./teamMember.service";
import { ActivityLogService } from "../activityLogs/activityLog.service";
import { CustomRequest } from "../../Interface/request";

const createTeamMember = catchAsync(async (req: Request, res: Response) => {
  if (req.file) {
    req.body.image = (req.file as any).path;
  }

  const result = await TeamMemberServices.createTeamMemberIntoDB(req.body);

  const user = (req as unknown as CustomRequest).user;
  if (user) {
    await ActivityLogService.createLog({
      userName: user.name,
      userEmail: user.email,
      actionDescription: `Created a team member: ${result.name}`,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team member created successfully",
    data: result,
  });
});

const getAllTeamMembers = catchAsync(async (req: Request, res: Response) => {
  const result = await TeamMemberServices.getAllTeamMembersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team members retrieved successfully",
    data: result,
  });
});

const getSingleTeamMember = catchAsync(async (req: Request, res: Response) => {
  const result = await TeamMemberServices.getSingleTeamMemberFromDB(
    req.params.id as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team member retrieved successfully",
    data: result,
  });
});

const updateTeamMember = catchAsync(async (req: Request, res: Response) => {
  if (req.file) {
    req.body.image = (req.file as any).path;
  }

  const result = await TeamMemberServices.updateTeamMemberInDB(
    req.params.id as string,
    req.body,
  );

  const user = (req as unknown as CustomRequest).user;
  if (user && result) {
    await ActivityLogService.createLog({
      userName: user.name,
      userEmail: user.email,
      actionDescription: `Updated a team member: ${result.name}`,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team member updated successfully",
    data: result,
  });
});

const deleteTeamMember = catchAsync(async (req: Request, res: Response) => {
  const result = await TeamMemberServices.deleteTeamMemberFromDB(
    req.params.id as string,
  );

  const user = (req as unknown as CustomRequest).user;
  if (user) {
    await ActivityLogService.createLog({
      userName: user.name,
      userEmail: user.email,
      actionDescription: `Deleted a team member (ID: ${req.params.id})`,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team member deleted successfully",
    data: result,
  });
});

const uploadTeamMemberImage = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Image file is required",
      data: null,
    });
    return;
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Image uploaded successfully",
    data: { image: (req.file as any).path },
  });
});

const updateTeamMemberPositions = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TeamMemberServices.updateTeamMemberPositionsArray(
      req.body.orderedIds,
    );

    const user = (req as unknown as CustomRequest).user;
    if (user) {
      await ActivityLogService.createLog({
        userName: user.name,
        userEmail: user.email,
        actionDescription: "Reordered team members",
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Team member positions updated successfully",
      data: result,
    });
  },
);

export const TeamMemberController = {
  createTeamMember,
  getAllTeamMembers,
  getSingleTeamMember,
  updateTeamMember,
  deleteTeamMember,
  uploadTeamMemberImage,
  updateTeamMemberPositions,
};
