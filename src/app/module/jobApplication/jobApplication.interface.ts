export type TJobApplication = {
  name: string;
  email: string;
  portfolio: string;
  jobTitle: string;
  resumeUrl: string;
  status: "New" | "Reviewing" | "Shortlisted" | "Rejected";
  requestId: string;
  isDeleted: boolean;
};

