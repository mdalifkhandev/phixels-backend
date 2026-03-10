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

const contactInfoSchema = new Schema({
  whatsapp: { type: String, default: "" },
  fiverr: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  email: { type: String, default: "" },
  behance: { type: String, default: "" },
  facebook: { type: String, default: "" },
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
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
    contactInfo: {
      type: contactInfoSchema,
      default: {
        whatsapp: "",
        fiverr: "",
        linkedin: "",
        email: "",
        behance: "",
        facebook: "",
        phone: "",
        address: "",
      },
    },
  },
  { timestamps: true },
);

export const AboutContent = model<AboutContentDocument>(
  "AboutContent",
  aboutContentSchema,
);
