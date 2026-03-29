import { FilterQuery } from "mongoose";
import { AnalyticsEvent } from "./analytics.model";
import {
  TAnalyticsEvent,
  TFunnelStep,
  TNotificationItem,
} from "./analytics.interface";
import { ActivityLogService } from "../activityLogs/activityLog.service";

type TRangeParams = {
  range?: string;
  start?: string;
  end?: string;
  source?: string;
};

const RANGE_TO_MS: Record<string, number> = {
  "1h": 60 * 60 * 1000,
  "1d": 24 * 60 * 60 * 1000,
  "3d": 3 * 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
  "1m": 30 * 24 * 60 * 60 * 1000,
  "3m": 90 * 24 * 60 * 60 * 1000,
  "6m": 180 * 24 * 60 * 60 * 1000,
  "1y": 365 * 24 * 60 * 60 * 1000,
};

const resolveDateRange = (params: TRangeParams) => {
  const now = new Date();
  if (params.start && params.end) {
    const start = new Date(params.start);
    const end = new Date(params.end);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      throw new Error("Invalid custom date range");
    }
    return { start, end, range: "custom" };
  }
  const key = (params.range || "7d").toLowerCase();
  if (key === "all") {
    return { start: new Date(0), end: now, range: "all" };
  }
  const duration = RANGE_TO_MS[key] ?? RANGE_TO_MS["7d"];
  return { start: new Date(now.getTime() - duration), end: now, range: key };
};

const buildRangeMatch = (
  params: TRangeParams,
): FilterQuery<TAnalyticsEvent> => {
  const { start, end } = resolveDateRange(params);
  return { eventAt: { $gte: start, $lte: end } };
};

const getSourceCondition = (source?: string): FilterQuery<TAnalyticsEvent> => {
  if (!source || source.toLowerCase() === "all traffic") return {};

  const key = source.toLowerCase();
  if (key === "email") {
    return { utmMedium: { $regex: "email", $options: "i" } };
  }
  if (key === "paid ads") {
    return {
      utmMedium: { $regex: "(cpc|ppc|paid|ads|ad)", $options: "i" },
    };
  }
  if (key === "social media") {
    return {
      $or: [
        { utmMedium: { $regex: "social", $options: "i" } },
        {
          referrer: {
            $regex: "(facebook|instagram|linkedin|twitter|tiktok)",
            $options: "i",
          },
        },
      ],
    };
  }
  if (key === "organic search") {
    return {
      $or: [
        { utmMedium: { $regex: "organic", $options: "i" } },
        {
          referrer: { $regex: "(google|bing|yahoo|duckduckgo)", $options: "i" },
        },
      ],
    };
  }
  if (key === "direct") {
    return {
      $or: [
        { referrer: { $in: [null, ""] } },
        { referrer: { $exists: false } },
      ],
    };
  }

  return {};
};

const countDistinctSessions = async (match: FilterQuery<TAnalyticsEvent>) => {
  const sessions = await AnalyticsEvent.distinct("sessionId", match);
  return sessions.length;
};

const getFunnelSteps = async (params: TRangeParams): Promise<TFunnelStep[]> => {
  const match = {
    ...buildRangeMatch(params),
    ...getSourceCondition(params.source),
  };
  const steps = [
    "popup_open",
    "lead_submitted",
    "meeting_started",
    "meeting_booked",
  ];

  const counts = await AnalyticsEvent.aggregate([
    { $match: { ...match, eventType: { $in: steps } } },
    { $group: { _id: "$eventType", count: { $sum: 1 } } },
  ]);

  const countMap = counts.reduce(
    (acc, item) => {
      acc[item._id] = item.count;
      return acc;
    },
    {} as Record<string, number>,
  );

  const results: TFunnelStep[] = [];
  let previousCount = 0;
  steps.forEach((step, index) => {
    const users = countMap[step] ?? 0;
    const rate =
      index === 0 ? 100 : previousCount > 0 ? (users / previousCount) * 100 : 0;
    const dropoff =
      index === 0 ? undefined : previousCount > 0 ? 100 - rate : undefined;
    results.push({
      stage: step,
      users,
      rate: Number(rate.toFixed(2)),
      dropoff: dropoff === undefined ? undefined : Number(dropoff.toFixed(2)),
    });
    previousCount = users;
  });

  return results;
};

const getEventsFromDB = async (
  params: TRangeParams & { eventType?: string; limit?: number },
) => {
  const match: FilterQuery<TAnalyticsEvent> = {
    ...buildRangeMatch(params),
    ...getSourceCondition(params.source),
  };

  if (params.eventType) {
    const eventTypes = params.eventType
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    if (eventTypes.length === 1) {
      match.eventType = eventTypes[0];
    } else if (eventTypes.length > 1) {
      match.eventType = { $in: eventTypes };
    }
  }

  const limit = Math.min(Math.max(Number(params.limit) || 100, 1), 500);
  return AnalyticsEvent.find(match).sort({ eventAt: -1 }).limit(limit).lean();
};

const formatTimeAgo = (date: Date) => {
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
};

const notificationMap: Record<
  string,
  { title: string; message: string; type: string }
> = {
  lead_submitted: {
    title: "New Project Request",
    message: "A new project request was submitted.",
    type: "lead",
  },
  meeting_booked: {
    title: "Meeting Confirmed",
    message: "A consultation meeting was booked.",
    type: "meeting",
  },
  contact_submitted: {
    title: "New Contact Message",
    message: "A new contact form message was submitted.",
    type: "contact",
  },
  newsletter_subscribed: {
    title: "New Newsletter Subscriber",
    message: "Someone subscribed to the newsletter.",
    type: "newsletter",
  },
  job_applied: {
    title: "Job Application",
    message: "A new job application was submitted.",
    type: "job",
  },
};

const buildNotifications = async () => {
  const types = Object.keys(notificationMap);
  const events = await AnalyticsEvent.find({ eventType: { $in: types } })
    .sort({ eventAt: -1 })
    .limit(10);

  return events.map((event) => {
    const mapping = notificationMap[event.eventType] ?? {
      title: "Activity",
      message: "New activity received.",
      type: "activity",
    };
    return {
      id: event._id.toString(),
      type: mapping.type,
      title: mapping.title,
      message: mapping.message,
      time: formatTimeAgo(event.eventAt),
      createdAt: event.eventAt,
    } as TNotificationItem;
  });
};

const createEventsIntoDB = async (events: TAnalyticsEvent[]) => {
  const result = await AnalyticsEvent.insertMany(events, { ordered: false });

  // Log significant events to Activity Logs
  for (const event of events) {
    if (event.eventType === "newsletter_subscribed") {
      await ActivityLogService.createLog({
        userName: "Public Visitor",
        userEmail: (event.metadata?.email as string) || "visitor@phixels.com",
        actionDescription: "Subscribed to the newsletter",
      });
    } else if (event.eventType === "job_applied") {
      await ActivityLogService.createLog({
        userName: (event.metadata?.name as string) || "Public Visitor",
        userEmail: (event.metadata?.email as string) || "visitor@phixels.com",
        actionDescription: `Applied for a job: ${
          (event.metadata?.title as string) || "Position"
        }`,
      });
    }
  }

  return result;
};

const getOverviewFromDB = async (params: TRangeParams) => {
  const match = buildRangeMatch(params);

  const totalVisits = await AnalyticsEvent.countDocuments({
    ...match,
    eventType: "page_view",
  });

  const totalLeads = await countDistinctSessions({
    ...match,
    eventType: "lead_submitted",
  });

  const bookedLeads = await countDistinctSessions({
    ...match,
    eventType: "meeting_booked",
  });

  const pendingLeads = Math.max(totalLeads - bookedLeads, 0);
  const conversionRate =
    totalLeads > 0 ? Number(((bookedLeads / totalLeads) * 100).toFixed(2)) : 0;

  const conversions = bookedLeads;

  const sessionPages = await AnalyticsEvent.aggregate([
    { $match: { ...match, eventType: "page_view" } },
    { $group: { _id: "$sessionId", pageViews: { $sum: 1 } } },
  ]);
  const bouncedSessions = sessionPages.filter((s) => s.pageViews === 1).length;
  const bounceRate =
    sessionPages.length > 0
      ? Number(((bouncedSessions / sessionPages.length) * 100).toFixed(2))
      : 0;

  const sessionDurations = await AnalyticsEvent.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$sessionId",
        firstEvent: { $min: "$eventAt" },
        lastEvent: { $max: "$eventAt" },
      },
    },
    {
      $project: {
        durationMs: { $subtract: ["$lastEvent", "$firstEvent"] },
      },
    },
  ]);
  const totalDurationMs = sessionDurations.reduce(
    (sum, session) => sum + (session.durationMs || 0),
    0,
  );
  const avgDurationMs =
    sessionDurations.length > 0 ? totalDurationMs / sessionDurations.length : 0;
  const avgDuration = Math.round(avgDurationMs / 1000);

  const clickCountsAgg = await AnalyticsEvent.aggregate([
    {
      $match: {
        ...match,
        eventType: "click",
        channel: {
          $in: ["gmail", "whatsapp", "fiverr", "linkedin", "facebook"],
        },
      },
    },
    {
      $group: { _id: "$channel", count: { $sum: 1 } },
    },
  ]);

  const clickCounts = clickCountsAgg.reduce(
    (acc, item) => {
      acc[item._id] = item.count;
      return acc;
    },
    {
      gmail: 0,
      whatsapp: 0,
      fiverr: 0,
      linkedin: 0,
      facebook: 0,
      emailOpens: 0,
    } as Record<string, number>,
  );

  const emailOpenCount = await AnalyticsEvent.countDocuments({
    ...match,
    eventType: "email_open",
  });
  clickCounts.emailOpens = emailOpenCount;

  const realtimeSince = new Date(Date.now() - 5 * 60 * 1000);
  const realtimeUsers = await countDistinctSessions({
    eventAt: { $gte: realtimeSince },
  });

  const funnel = await getFunnelSteps(params);
  const popupViews =
    funnel.find((step) => step.stage === "popup_open")?.users ?? 0;
  const dropoffRate =
    popupViews > 0 && totalLeads > 0
      ? Number(((1 - totalLeads / popupViews) * 100).toFixed(2))
      : 0;

  const criticalInsights = [];
  if (pendingLeads > 0) {
    criticalInsights.push({
      id: "pending-leads",
      title: `${pendingLeads} Leads Stuck at Step 1`,
      description:
        "These users completed step 1 but did not book a meeting. Consider follow-up.",
      severity: "high",
    });
  }
  if (dropoffRate > 50) {
    criticalInsights.push({
      id: "popup-dropoff",
      title: `High Popup Drop-off (${dropoffRate}%)`,
      description:
        "A large share of users opened the popup but did not complete step 1.",
      severity: "medium",
    });
  }
  if (criticalInsights.length === 0) {
    criticalInsights.push({
      id: "healthy",
      title: "No Critical Issues Detected",
      description: "Funnel metrics are within healthy ranges.",
      severity: "low",
    });
  }

  const notifications = await buildNotifications();

  return {
    totalVisits,
    conversions,
    bounceRate,
    avgDuration,
    totalLeads,
    pendingLeads,
    bookedLeads,
    conversionRate,
    realtimeUsers,
    clickCounts,
    funnel,
    criticalInsights,
    notifications,
  };
};

const getRealtimeFromDB = async () => {
  const since = new Date(Date.now() - 5 * 60 * 1000);
  const events = await AnalyticsEvent.find({ eventAt: { $gte: since } })
    .sort({ eventAt: -1 })
    .limit(100);

  const sessionIds = Array.from(
    new Set(events.map((event) => event.sessionId)),
  );
  const activeUsers = sessionIds.length;

  // Fetch the first event for each session to calculate total duration
  const firstEvents = await AnalyticsEvent.aggregate([
    { $match: { sessionId: { $in: sessionIds } } },
    { $group: { _id: "$sessionId", firstEventAt: { $min: "$eventAt" } } },
  ]);

  const firstEventMap = firstEvents.reduce(
    (acc, item) => {
      acc[item._id] = new Date(item.firstEventAt);
      return acc;
    },
    {} as Record<string, Date>,
  );

  const formatDuration = (start: Date, end: Date) => {
    const diffSeconds = Math.floor((end.getTime() - start.getTime()) / 1000);
    if (diffSeconds < 60) return `${diffSeconds}s`;
    const mins = Math.floor(diffSeconds / 60);
    const secs = diffSeconds % 60;
    return `${mins}m ${secs}s`;
  };

  const deviceCounts = events.reduce(
    (acc, event) => {
      const device = event.deviceType ?? "unknown";
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const pageCounts = events.reduce(
    (acc, event) => {
      if (!event.pagePath) return acc;
      acc[event.pagePath] = (acc[event.pagePath] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const liveEvents = events.map((event) => {
    const firstEventAt = firstEventMap[event.sessionId] || event.eventAt;
    const device = (event.deviceType || "unknown").toLowerCase();
    const normalizedDevice =
      device === "desktop"
        ? "Desktop"
        : device === "mobile"
          ? "Mobile"
          : device === "tablet"
            ? "Tablet"
            : "Desktop";

    return {
      event: event.pagePath ? `Page View: ${event.pagePath}` : event.eventType,
      location:
        event.city && event.country
          ? `${event.city}, ${event.country}`
          : event.country || "Unknown",
      device: normalizedDevice,
      duration: formatDuration(firstEventAt, event.eventAt),
      time: formatTimeAgo(event.eventAt),
      activity: event.eventType.replace(/_/g, " "),
    };
  });

  return {
    activeUsers,
    deviceCounts,
    pageCounts,
    liveEvents,
  };
};

const getTrafficSeriesFromDB = async (params: TRangeParams) => {
  const match = buildRangeMatch(params);

  const [visits, conversions] = await Promise.all([
    AnalyticsEvent.aggregate([
      { $match: { ...match, eventType: "page_view" } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$eventAt" },
          },
          visitors: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
    AnalyticsEvent.aggregate([
      { $match: { ...match, eventType: "meeting_booked" } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$eventAt" },
          },
          conversions: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
  ]);

  const conversionMap = conversions.reduce(
    (acc, item) => {
      acc[item._id] = item.conversions;
      return acc;
    },
    {} as Record<string, number>,
  );

  return visits.map((item) => ({
    name: item._id,
    visitors: item.visitors,
    conversions: conversionMap[item._id] || 0,
  }));
};

const getTopPagesFromDB = async (params: TRangeParams) => {
  const match = buildRangeMatch(params);
  const pages = await AnalyticsEvent.aggregate([
    { $match: { ...match, eventType: "page_view", pagePath: { $ne: null } } },
    { $group: { _id: "$pagePath", visits: { $sum: 1 } } },
    { $sort: { visits: -1 } },
    { $limit: 10 },
  ]);

  const conversionCounts = await AnalyticsEvent.aggregate([
    { $match: { ...match, eventType: "meeting_booked" } },
    { $group: { _id: "$pagePath", conversions: { $sum: 1 } } },
  ]);
  const conversionMap = conversionCounts.reduce(
    (acc, item) => {
      if (item._id) acc[item._id] = item.conversions;
      return acc;
    },
    {} as Record<string, number>,
  );

  return pages.map((page) => ({
    path: page._id,
    visits: page.visits,
    avgTime: null,
    bounce: null,
    conversions: conversionMap[page._id] || 0,
  }));
};

const getDeviceBreakdownFromDB = async (params: TRangeParams) => {
  const match = buildRangeMatch(params);
  const deviceCounts = await AnalyticsEvent.aggregate([
    { $match: { ...match, eventType: "page_view" } },
    { $group: { _id: "$deviceType", count: { $sum: 1 } } },
  ]);

  return deviceCounts.reduce(
    (acc, item) => {
      const key = item._id || "unknown";
      acc[key] = item.count;
      return acc;
    },
    {} as Record<string, number>,
  );
};

const getTopCitiesFromDB = async (params: TRangeParams) => {
  const match = buildRangeMatch(params);
  const cities = await AnalyticsEvent.aggregate([
    {
      $match: {
        ...match,
        city: { $ne: null },
        country: { $ne: null },
      },
    },
    {
      $group: {
        _id: { city: "$city", country: "$country" },
        visitors: { $sum: 1 },
      },
    },
    { $sort: { visitors: -1 } },
    { $limit: 10 },
  ]);

  return cities.map((item) => ({
    name: item._id.city,
    country: item._id.country,
    visitors: item.visitors,
  }));
};

const getTopCountriesFromDB = async (params: TRangeParams) => {
  const match = buildRangeMatch(params);
  const countries = await AnalyticsEvent.aggregate([
    {
      $match: {
        ...match,
        country: { $ne: null },
      },
    },
    {
      $group: {
        _id: "$country",
        visitors: { $sum: 1 },
        conversions: {
          $sum: {
            $cond: [{ $eq: ["$eventType", "meeting_booked"] }, 1, 0],
          },
        },
      },
    },
    { $sort: { visitors: -1 } },
    { $limit: 10 },
  ]);

  return countries.map((item) => ({
    code: item._id,
    name: item._id,
    visitors: item.visitors,
    conversions: item.conversions,
    rate: item.visitors > 0 ? (item.conversions / item.visitors) * 100 : 0,
    trend: "neutral",
  }));
};

const getTrafficSourcesFromDB = async (params: TRangeParams) => {
  const match = buildRangeMatch(params);

  const basePipeline = [
    {
      $addFields: {
        utmMediumLower: { $toLower: { $ifNull: ["$utmMedium", ""] } },
        referrerLower: { $toLower: { $ifNull: ["$referrer", ""] } },
      },
    },
    {
      $addFields: {
        source: {
          $switch: {
            branches: [
              {
                case: {
                  $regexMatch: {
                    input: "$utmMediumLower",
                    regex: /(email)/,
                  },
                },
                then: "Email",
              },
              {
                case: {
                  $regexMatch: {
                    input: "$utmMediumLower",
                    regex: /(cpc|ppc|paid|ads|ad)/,
                  },
                },
                then: "Paid Ads",
              },
              {
                case: {
                  $or: [
                    {
                      $regexMatch: {
                        input: "$utmMediumLower",
                        regex: /(social)/,
                      },
                    },
                    {
                      $regexMatch: {
                        input: "$referrerLower",
                        regex: /(facebook|instagram|linkedin|twitter|tiktok)/,
                      },
                    },
                  ],
                },
                then: "Social Media",
              },
              {
                case: {
                  $or: [
                    {
                      $regexMatch: {
                        input: "$utmMediumLower",
                        regex: /(organic)/,
                      },
                    },
                    {
                      $regexMatch: {
                        input: "$referrerLower",
                        regex: /(google|bing|yahoo|duckduckgo)/,
                      },
                    },
                  ],
                },
                then: "Organic Search",
              },
              {
                case: {
                  $eq: ["$referrerLower", ""],
                },
                then: "Direct",
              },
            ],
            default: "Direct",
          },
        },
      },
    },
  ];

  const visitorsAgg = await AnalyticsEvent.aggregate([
    { $match: { ...match, eventType: "page_view" } },
    ...basePipeline,
    { $group: { _id: "$source", visitors: { $sum: 1 } } },
  ]);

  const conversionsAgg = await AnalyticsEvent.aggregate([
    { $match: { ...match, eventType: "meeting_booked" } },
    ...basePipeline,
    { $group: { _id: "$source", conversions: { $sum: 1 } } },
  ]);

  const conversionMap = conversionsAgg.reduce(
    (acc, item) => {
      acc[item._id] = item.conversions;
      return acc;
    },
    {} as Record<string, number>,
  );

  const totalVisitors =
    visitorsAgg.reduce((sum, item) => sum + item.visitors, 0) || 1;

  return visitorsAgg
    .map((item) => ({
      name: item._id,
      visitors: item.visitors,
      share: Number(((item.visitors / totalVisitors) * 100).toFixed(1)),
      conversions: conversionMap[item._id] || 0,
      conversionRate:
        item.visitors > 0
          ? Number(
              (((conversionMap[item._id] || 0) / item.visitors) * 100).toFixed(
                1,
              ),
            )
          : 0,
      trend: 0,
    }))
    .sort((a, b) => b.visitors - a.visitors);
};

const getCampaignPerformanceFromDB = async (params: TRangeParams) => {
  const match = buildRangeMatch(params);

  const data = await AnalyticsEvent.aggregate([
    { $match: match },
    {
      $addFields: {
        campaignName: {
          $cond: [
            {
              $or: [
                { $eq: ["$utmCampaign", null] },
                { $eq: ["$utmCampaign", ""] },
              ],
            },
            "(direct)",
            "$utmCampaign",
          ],
        },
      },
    },
    {
      $group: {
        _id: "$campaignName",
        impressions: {
          $sum: { $cond: [{ $eq: ["$eventType", "page_view"] }, 1, 0] },
        },
        clicks: {
          $sum: { $cond: [{ $eq: ["$eventType", "click"] }, 1, 0] },
        },
        conversions: {
          $sum: { $cond: [{ $eq: ["$eventType", "meeting_booked"] }, 1, 0] },
        },
        lastEventAt: { $max: "$eventAt" },
      },
    },
    { $sort: { impressions: -1 } },
    { $limit: 20 },
  ]);

  return data.map((item) => {
    const ctr =
      item.impressions > 0 ? (item.clicks / item.impressions) * 100 : 0;
    const roi = item.clicks > 0 ? (item.conversions / item.clicks) * 100 : 0;
    const lastEventAt = item.lastEventAt
      ? new Date(item.lastEventAt)
      : new Date(0);
    const daysSinceLastEvent =
      (Date.now() - lastEventAt.getTime()) / (1000 * 60 * 60 * 24);
    const status =
      daysSinceLastEvent <= 7
        ? "Active"
        : daysSinceLastEvent <= 30
          ? "Paused"
          : "Ended";

    return {
      name: item._id,
      status,
      impressions: item.impressions,
      clicks: item.clicks,
      ctr: Number(ctr.toFixed(1)),
      conversions: item.conversions,
      cost: 0,
      roi: Number(roi.toFixed(1)),
      lastEventAt,
    };
  });
};

const getPlatformPerformanceFromDB = async (params: TRangeParams) => {
  const match = buildRangeMatch(params);
  const events = await AnalyticsEvent.find(match).lean();

  const platforms = {
    google: {
      id: "google",
      name: "Google Ads",
      impressions: 0,
      clicks: 0,
      conversions: 0,
      lastSync: null as Date | null,
    },
    facebook: {
      id: "facebook",
      name: "Meta Ads",
      impressions: 0,
      clicks: 0,
      conversions: 0,
      lastSync: null as Date | null,
    },
    linkedin: {
      id: "linkedin",
      name: "LinkedIn Ads",
      impressions: 0,
      clicks: 0,
      conversions: 0,
      lastSync: null as Date | null,
    },
  };

  const resolvePlatform = (event: any): keyof typeof platforms | null => {
    const source =
      `${event.utmSource || ""} ${event.referrer || ""}`.toLowerCase();
    if (source.includes("google")) return "google";
    if (
      source.includes("facebook") ||
      source.includes("instagram") ||
      source.includes("meta")
    )
      return "facebook";
    if (source.includes("linkedin")) return "linkedin";
    return null;
  };

  events.forEach((event) => {
    const key = resolvePlatform(event);
    if (!key) return;
    const target = platforms[key];

    if (event.eventType === "page_view") target.impressions += 1;
    if (event.eventType === "click") target.clicks += 1;
    if (event.eventType === "meeting_booked") target.conversions += 1;

    const eventAt = new Date(event.eventAt);
    if (!target.lastSync || eventAt > target.lastSync) {
      target.lastSync = eventAt;
    }
  });

  return Object.values(platforms).map((platform) => ({
    ...platform,
    status:
      platform.impressions + platform.clicks + platform.conversions > 0
        ? "connected"
        : "disconnected",
    spend: 0,
  }));
};

export const AnalyticsServices = {
  createEventsIntoDB,
  getOverviewFromDB,
  getRealtimeFromDB,
  getFunnelSteps,
  getEventsFromDB,
  getTrafficSeriesFromDB,
  getTopPagesFromDB,
  getDeviceBreakdownFromDB,
  getTopCitiesFromDB,
  getTopCountriesFromDB,
  getTrafficSourcesFromDB,
  getCampaignPerformanceFromDB,
  getPlatformPerformanceFromDB,
  resolveDateRange,
};
