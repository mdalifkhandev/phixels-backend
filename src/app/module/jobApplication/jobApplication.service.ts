import { JobApplicationModel } from "./jobApplication.model";
import { TJobApplication } from "./jobApplication.interface";

const createJobApplicationIntoDB = async (payload: TJobApplication) => {
  const result = await JobApplicationModel.create(payload);
  return result;
};

const getAllJobApplicationsFromDB = async () => {
  const result = await JobApplicationModel.find().sort("-createdAt");
  return result;
};

const updateJobApplicationIntoDB = async (id: string, payload: Partial<TJobApplication>) => {
  const result = await JobApplicationModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteJobApplicationFromDB = async (id: string) => {
  const result = await JobApplicationModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const JobApplicationService = {
  createJobApplicationIntoDB,
  getAllJobApplicationsFromDB,
  updateJobApplicationIntoDB,
  deleteJobApplicationFromDB,
};

