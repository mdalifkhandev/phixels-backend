import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AnalyticsServices } from "./analytics.service";
import geoip from "geoip-lite";

const createEvents = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body?.events ?? req.body;
  const events = Array.isArray(payload) ? payload : [payload];
  if (!events.length) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "No analytics events provided",
      data: null,
    });
    return;
  }

  // Get client IP address
  let ip =
    (req.headers["x-forwarded-for"] as string) ||
    req.socket.remoteAddress ||
    "";
  if (ip.includes(",")) {
    ip = ip.split(",")[0].trim();
  }

  // Basic cleanup for IPv6 mapped IPv4 addresses
  if (ip.startsWith("::ffff:")) {
    ip = ip.substring(7);
  }

  // Mock IP for local development if it's 127.0.0.1 or ::1
  const isLocal = ip === "127.0.0.1" || ip === "::1" || ip === "localhost";

  let city = "Unknown";
  let country = "Unknown";

  if (isLocal) {
    city = "Dhaka (Dev)";
    country = "BD";
  } else {
    const geo = geoip.lookup(ip);
    if (geo) {
      city = geo.city || "Unknown";
      country = geo.country || "Unknown";
    }
  }

  const normalized = events.map((event: any) => ({
    ...event,
    city: event.city || city,
    country: event.country || country,
    eventAt: event.eventAt ? new Date(event.eventAt) : new Date(),
  }));

  await AnalyticsServices.createEventsIntoDB(normalized);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Analytics events recorded",
    data: { inserted: normalized.length },
  });
});

const getOverview = catchAsync(async (req: Request, res: Response) => {
  const data = await AnalyticsServices.getOverviewFromDB({
    range: req.query.range as string | undefined,
    start: req.query.start as string | undefined,
    end: req.query.end as string | undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Analytics overview retrieved",
    data,
  });
});

const getRealtime = catchAsync(async (_req: Request, res: Response) => {
  const data = await AnalyticsServices.getRealtimeFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Realtime analytics retrieved",
    data,
  });
});

const getFunnel = catchAsync(async (req: Request, res: Response) => {
  const data = await AnalyticsServices.getFunnelSteps({
    range: req.query.range as string | undefined,
    start: req.query.start as string | undefined,
    end: req.query.end as string | undefined,
    source: req.query.source as string | undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Funnel analytics retrieved",
    data,
  });
});

const getEvents = catchAsync(async (req: Request, res: Response) => {
  const data = await AnalyticsServices.getEventsFromDB({
    range: req.query.range as string | undefined,
    start: req.query.start as string | undefined,
    end: req.query.end as string | undefined,
    source: req.query.source as string | undefined,
    eventType: req.query.eventType as string | undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Analytics events retrieved",
    data,
  });
});

const getTrafficSeries = catchAsync(async (req: Request, res: Response) => {
  const data = await AnalyticsServices.getTrafficSeriesFromDB({
    range: req.query.range as string | undefined,
    start: req.query.start as string | undefined,
    end: req.query.end as string | undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Traffic series retrieved",
    data,
  });
});

const getTopPages = catchAsync(async (req: Request, res: Response) => {
  const data = await AnalyticsServices.getTopPagesFromDB({
    range: req.query.range as string | undefined,
    start: req.query.start as string | undefined,
    end: req.query.end as string | undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Top pages retrieved",
    data,
  });
});

const getDevices = catchAsync(async (req: Request, res: Response) => {
  const data = await AnalyticsServices.getDeviceBreakdownFromDB({
    range: req.query.range as string | undefined,
    start: req.query.start as string | undefined,
    end: req.query.end as string | undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Device breakdown retrieved",
    data,
  });
});

const getTopCities = catchAsync(async (req: Request, res: Response) => {
  const data = await AnalyticsServices.getTopCitiesFromDB({
    range: req.query.range as string | undefined,
    start: req.query.start as string | undefined,
    end: req.query.end as string | undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Top cities retrieved",
    data,
  });
});

const getTopCountries = catchAsync(async (req: Request, res: Response) => {
  const data = await AnalyticsServices.getTopCountriesFromDB({
    range: req.query.range as string | undefined,
    start: req.query.start as string | undefined,
    end: req.query.end as string | undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Top countries retrieved",
    data,
  });
});

const getTrafficSources = catchAsync(async (req: Request, res: Response) => {
  const data = await AnalyticsServices.getTrafficSourcesFromDB({
    range: req.query.range as string | undefined,
    start: req.query.start as string | undefined,
    end: req.query.end as string | undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Traffic sources retrieved",
    data,
  });
});

const getCampaignPerformance = catchAsync(
  async (req: Request, res: Response) => {
    const data = await AnalyticsServices.getCampaignPerformanceFromDB({
      range: req.query.range as string | undefined,
      start: req.query.start as string | undefined,
      end: req.query.end as string | undefined,
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Campaign performance retrieved",
      data,
    });
  },
);

const getPlatformPerformance = catchAsync(
  async (req: Request, res: Response) => {
    const data = await AnalyticsServices.getPlatformPerformanceFromDB({
      range: req.query.range as string | undefined,
      start: req.query.start as string | undefined,
      end: req.query.end as string | undefined,
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Platform performance retrieved",
      data,
    });
  },
);

export const AnalyticsController = {
  createEvents,
  getOverview,
  getRealtime,
  getFunnel,
  getEvents,
  getTrafficSeries,
  getTopPages,
  getDevices,
  getTopCities,
  getTopCountries,
  getTrafficSources,
  getCampaignPerformance,
  getPlatformPerformance,
};
