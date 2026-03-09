import { Schema, model } from "mongoose";
import {
  TeamMemberDocument,
  TTeamMemberSocialLinks,
} from "./teamMember.interface";

const socialLinksSchema = new Schema<TTeamMemberSocialLinks>(
  {
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    github: { type: String, default: "" },
  },
  { _id: false },
);

const teamMemberSchema = new Schema<TeamMemberDocument>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    socialLinks: { type: socialLinksSchema, default: {} },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const TeamMemberModel = model<TeamMemberDocument>(
  "TeamMember",
  teamMemberSchema,
);
