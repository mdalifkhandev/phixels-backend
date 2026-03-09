import { Schema, model } from "mongoose";
import {
  PAGE_METRIC_ICON_KEYS,
  PageMetricsDocument,
  TPageMetric,
} from "./pageMetrics.interface";

const pageMetricSchema = new Schema<TPageMetric>(
  {
    label: { type: String, required: true, trim: true },
    value: { type: Number, required: true },
    suffix: { type: String, default: "" },
    iconKey: {
      type: String,
      enum: PAGE_METRIC_ICON_KEYS,
      required: false,
    },
  },
  { _id: false },
);

const defaultHomeHeroMetrics: TPageMetric[] = [
  { label: "Revenue Growth", value: 420, suffix: "%" },
  { label: "Active Users", value: 1.2, suffix: "M+" },
];

const defaultServicesPageMetrics: TPageMetric[] = [
  { label: "Projects Delivered", value: 500, suffix: "+" },
  { label: "Happy Clients", value: 300, suffix: "+" },
  { label: "Expert Developers", value: 50, suffix: "+" },
  { label: "Countries Served", value: 25, suffix: "+" },
];

const defaultProductsPageMetrics: TPageMetric[] = [
  { label: "Active Users", value: 1.2, suffix: "M+", iconKey: "users" },
  { label: "Total Downloads", value: 2.5, suffix: "M+", iconKey: "download" },
  { label: "Average Rating", value: 4.8, suffix: "", iconKey: "star" },
  { label: "Growth Rate", value: 150, suffix: "%", iconKey: "trending-up" },
];

const pageMetricsSchema = new Schema<PageMetricsDocument>(
  {
    homeHeroMetrics: {
      type: [pageMetricSchema],
      default: defaultHomeHeroMetrics,
      validate: {
        validator: (value: TPageMetric[]) => value.length === 2,
        message: "homeHeroMetrics must contain exactly 2 items",
      },
    },
    servicesPageMetrics: {
      type: [pageMetricSchema],
      default: defaultServicesPageMetrics,
      validate: {
        validator: (value: TPageMetric[]) => value.length === 4,
        message: "servicesPageMetrics must contain exactly 4 items",
      },
    },
    productsPageMetrics: {
      type: [pageMetricSchema],
      default: defaultProductsPageMetrics,
      validate: {
        validator: (value: TPageMetric[]) => value.length === 4,
        message: "productsPageMetrics must contain exactly 4 items",
      },
    },
  },
  { timestamps: true },
);

export const PageMetricsModel = model<PageMetricsDocument>(
  "PageMetrics",
  pageMetricsSchema,
);
