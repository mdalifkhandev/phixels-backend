import { Schema, model } from "mongoose";
import { TLegalSection, TLegalContent } from "./legalContent.interface";

const legalSectionSchema = new Schema<TLegalSection>({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const legalContentSchema = new Schema<TLegalContent>(
  {
    privacyPolicy: {
      type: [legalSectionSchema],
      default: [],
    },
    termsConditions: {
      type: [legalSectionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const LegalContent = model<TLegalContent>(
  "LegalContent",
  legalContentSchema,
);
