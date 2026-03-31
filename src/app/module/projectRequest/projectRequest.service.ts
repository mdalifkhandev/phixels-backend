import { TProjectRequest } from "./projectRequest.interface";
import { ProjectRequestModel } from "./projectRequest.model";

const createProjectRequestIntoDB = async (payload: TProjectRequest) => {
  const result = await ProjectRequestModel.create(payload);
  return result;
};

const getAllProjectRequestsFromDB = async (query: Record<string, unknown>) => {
  const result = await ProjectRequestModel.find(query).sort({ createdAt: -1 });
  return result;
};

const getSingleProjectRequestFromDB = async (id: string) => {
  const result = await ProjectRequestModel.findById(id);
  return result;
};

const updateProjectRequestInDB = async (
  id: string,
  payload: Partial<TProjectRequest>,
) => {
  const result = await ProjectRequestModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteProjectRequestFromDB = async (id: string) => {
  const result = await ProjectRequestModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const ProjectRequestServices = {
  createProjectRequestIntoDB,
  getAllProjectRequestsFromDB,
  getSingleProjectRequestFromDB,
  updateProjectRequestInDB,
  deleteProjectRequestFromDB,
};
