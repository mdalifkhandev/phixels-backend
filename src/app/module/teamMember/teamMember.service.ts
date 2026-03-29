import { Types } from "mongoose";
import { TTeamMember } from "./teamMember.interface";
import { TeamMemberModel } from "./teamMember.model";

const getNextSortOrder = async () => {
  const lastMember = await TeamMemberModel.findOne().sort({ sortOrder: -1 });
  return (lastMember?.sortOrder ?? -1) + 1;
};

const createTeamMemberIntoDB = async (payload: TTeamMember) => {
  const nextSortOrder =
    payload.sortOrder === undefined
      ? await getNextSortOrder()
      : payload.sortOrder;

  const result = await TeamMemberModel.create({
    ...payload,
    sortOrder: nextSortOrder,
  });

  return result;
};

const getAllTeamMembersFromDB = async (query: Record<string, unknown> = {}) => {
  const filter: Record<string, unknown> = {};

  if (query.all !== "true") {
    filter.isActive = true;
  }

  const result = await TeamMemberModel.find(filter).sort({
    sortOrder: 1,
    createdAt: 1,
  });

  return result;
};

const getSingleTeamMemberFromDB = async (id: string) => {
  const result = await TeamMemberModel.findById(id);
  return result;
};

const updateTeamMemberInDB = async (
  id: string,
  payload: Partial<TTeamMember>,
) => {
  const result = await TeamMemberModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteTeamMemberFromDB = async (id: string) => {
  const result = await TeamMemberModel.findByIdAndDelete(id);
  return result;
};

const updateTeamMemberPositionsArray = async (orderedIds: string[]) => {
  const bulkOperations = orderedIds.map((id, index) => ({
    updateOne: {
      filter: { _id: new Types.ObjectId(id) },
      update: { sortOrder: index },
    },
  }));

  const result = await TeamMemberModel.bulkWrite(bulkOperations);
  return result;
};

export const TeamMemberServices = {
  createTeamMemberIntoDB,
  getAllTeamMembersFromDB,
  getSingleTeamMemberFromDB,
  updateTeamMemberInDB,
  deleteTeamMemberFromDB,
  updateTeamMemberPositionsArray,
};
