import { Schema, model } from "mongoose";
import { TPageContent, TPageSection } from "./pageContent.interface";

const pageSectionSchema = new Schema<TPageSection>({
  sectionKey: { type: String, required: true },
  head: { type: String },
  subHead: { type: String },
  caption: { type: String },
  description: { type: String },
  buttonText: { type: String },
  buttonLink: { type: String },
  image: { type: String },
  video: { type: String },
}, { _id: false });

const pageContentSchema = new Schema<TPageContent>(
  {
    pageKey: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    sections: { type: [pageSectionSchema], default: [] },
  },
  { timestamps: true }
);

export const PageContent = model<TPageContent>("PageContent", pageContentSchema);
