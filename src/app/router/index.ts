import { Router } from "express";
import { AuthRouter } from "../module/authentication/auth.rought";
import { MailRouter } from "../module/mails/mail.route";
import { BlogRouter } from "../module/blogs/blog.route";
import { PortfolioRouter } from "../module/portfolio/portfolio.route";
import { CaseStudyRouter } from "../module/caseStudy/caseStudy.route";
import { ProductRouter } from "../module/product/product.route";
import { CareerRouter } from "../module/career/career.route";
import { ServiceRouter } from "../module/service/service.route";
import { AnalyticsRouter } from "../module/analytics/analytics.route";
import { ReviewRouter } from "../module/reviews/review.route";
import { SettingsRouter } from "../module/settings/settings.route";
import { AuthorRouter } from "../module/author/author.route";
import { UserRouter } from "../module/users/user.route";
import { ActivityLogRouter } from "../module/activityLogs/activityLog.route";
import { AboutContentRoutes } from "../module/aboutContent/aboutContent.route";
import { TeamMemberRouter } from "../module/teamMember/teamMember.route";
import { PageMetricsRoutes } from "../module/pageMetrics/pageMetrics.route";
import { LegalContentRoutes } from "../module/legalContent/legalContent.route";
import { SitemapRouter } from "../module/sitemap/sitemap.route";
import { PageContentRoutes } from "../module/pageContent/pageContent.route";

const router = Router();

const moduleRought = [
  {
    path: "/",
    route: SitemapRouter,
  },
  {
    path: "/auth",
    route: AuthRouter,
  },
  {
    path: "/mail",
    route: MailRouter,
  },
  {
    path: "/blogs",
    route: BlogRouter,
  },
  {
    path: "/portfolio",
    route: PortfolioRouter,
  },
  {
    path: "/case-studies",
    route: CaseStudyRouter,
  },
  {
    path: "/products",
    route: ProductRouter,
  },
  {
    path: "/careers",
    route: CareerRouter,
  },
  {
    path: "/services",
    route: ServiceRouter,
  },
  {
    path: "/analytics",
    route: AnalyticsRouter,
  },
  {
    path: "/reviews",
    route: ReviewRouter,
  },
  {
    path: "/settings",
    route: SettingsRouter,
  },
  {
    path: "/authors",
    route: AuthorRouter,
  },
  {
    path: "/users",
    route: UserRouter,
  },
  {
    path: "/activity-logs",
    route: ActivityLogRouter,
  },
  {
    path: "/about-content",
    route: AboutContentRoutes,
  },
  {
    path: "/team-members",
    route: TeamMemberRouter,
  },
  {
    path: "/page-metrics",
    route: PageMetricsRoutes,
  },
  {
    path: "/legal-content",
    route: LegalContentRoutes,
  },
  {
    path: "/page-content",
    route: PageContentRoutes,
  },
];

moduleRought.forEach((route) => router.use(route.path, route.route));

export const Routers = router;
