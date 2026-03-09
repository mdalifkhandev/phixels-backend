import { Schema, model } from "mongoose";
import {
  AboutContentDocument,
  TMetric,
  TPhilosophy,
} from "./aboutContent.interface";

const metricSchema = new Schema<TMetric>({
  label: { type: String, required: true },
  value: { type: Number, required: true },
  suffix: { type: String, default: "" },
});

const philosophySchema = new Schema<TPhilosophy>({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: "" },
});

const aboutContentSchema = new Schema<AboutContentDocument>(
  {
    metrics: { type: [metricSchema], default: [] },
    philosophy: {
      type: philosophySchema,
      default: {
        heading: "Our Philosophy",
        description: "Update your philosophy here.",
        image: "",
      },
    },
  },
  { timestamps: true },
);

export const AboutContent = model<AboutContentDocument>(
  "AboutContent",
  aboutContentSchema,
);
