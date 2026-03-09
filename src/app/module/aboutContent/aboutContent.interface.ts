import { Document } from "mongoose";

export type TMetric = {
  label: string;
  value: number;
  suffix: string;
};

export type TPhilosophy = {
  heading: string;
  description: string;
  image?: string;
};

export type TAboutContent = {
  metrics: TMetric[];
  philosophy: TPhilosophy;
};

export interface AboutContentDocument extends TAboutContent, Document {}
