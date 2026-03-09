import { Document } from "mongoose";

export const PAGE_METRIC_ICON_KEYS = [
  "users",
  "download",
  "star",
  "trending-up",
] as const;

export type TPageMetricIconKey = (typeof PAGE_METRIC_ICON_KEYS)[number];

export type TPageMetric = {
  label: string;
  value: number;
  suffix: string;
  iconKey?: TPageMetricIconKey;
};

export type TPageMetricsContent = {
  homeHeroMetrics: TPageMetric[];
  servicesPageMetrics: TPageMetric[];
  productsPageMetrics: TPageMetric[];
};

export interface PageMetricsDocument extends TPageMetricsContent, Document {}
