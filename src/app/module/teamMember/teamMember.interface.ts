import { Document } from "mongoose";

export type TTeamMemberSocialLinks = {
  linkedin?: string;
  twitter?: string;
  github?: string;
};

export type TTeamMember = {
  name: string;
  role: string;
  image?: string;
  socialLinks?: TTeamMemberSocialLinks;
  sortOrder?: number;
  isActive?: boolean;
};

export interface TeamMemberDocument extends TTeamMember, Document {}
