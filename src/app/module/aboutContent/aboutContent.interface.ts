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

export type TContactInfo = {
  whatsapp: string;
  fiverr: string;
  linkedin: string;
  email: string;
  behance: string;
  facebook: string;
  phone: string;
  address: string;
};

export type TClient = {
  name: string;
  logo: string;
};

export type TAboutContent = {
  metrics: TMetric[];
  philosophy: TPhilosophy;
  contactInfo: TContactInfo;
  clients: TClient[];
};

export interface AboutContentDocument extends TAboutContent, Document {}
