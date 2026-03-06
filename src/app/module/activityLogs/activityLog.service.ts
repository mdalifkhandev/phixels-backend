import { TActivityLog } from "./activityLog.interface";
import { ActivityLog } from "./activityLog.model";

const createLog = async (payload: TActivityLog) => {
  const result = await ActivityLog.create(payload);
  return result;
};

const getLogs = async () => {
  // Return latest 100 activity logs
  const result = await ActivityLog.find().sort({ createdAt: -1 }).limit(100);
  return result;
};

export const ActivityLogService = {
  createLog,
  getLogs,
};
