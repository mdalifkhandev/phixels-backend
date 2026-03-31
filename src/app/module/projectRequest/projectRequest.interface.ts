export type TProjectRequest = {
  name: string;
  email: string;
  phone: string;
  country: string;
  budget?: string;
  description?: string;
  formType: string;
  files?: Array<{
    name?: string;
    url?: string;
    asset_id?: string;
    public_id?: string;
    width?: number;
    height?: number;
    format?: string;
    resource_type?: string;
    created_at?: string;
    secure_url?: string;
  }>;
  status: "Pending" | "Confirmed";
  meetingDate?: string;
  meetingTime?: string;
  projectProgress: string;
  assignedTo: string;
  requestId: string;
  isDeleted: boolean;
};
