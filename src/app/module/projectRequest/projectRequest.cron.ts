import cron from "node-cron";
import { ProjectRequestModel } from "./projectRequest.model";
import { SendMail } from "../mails/utils";
import config from "../../config";
import { getStep1ClientEmailTemplate, getStep1AdminEmailTemplate } from "./projectRequest.utils";

export const initProjectRequestCron = () => {
  // Run every minute
  cron.schedule("* * * * *", async () => {
    try {
      const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);

      // Find Pending requests created > 2 mins ago where Step 1 email has not been sent
      const pendingRequests = await ProjectRequestModel.find({
        status: "Pending",
        isStep1EmailSent: false,
        createdAt: { $lte: twoMinutesAgo },
        isDeleted: { $ne: true }
      });

      if (pendingRequests.length === 0) return;

      console.log(`[Cron] Found ${pendingRequests.length} pending project requests for Step 1 notification.`);

      for (const request of pendingRequests) {
        // Send email to Client
        const clientTemplate = getStep1ClientEmailTemplate(request.name);
        await SendMail({
          to: request.email,
          subject: clientTemplate.subject,
          html: clientTemplate.html
        });

        // Send email to Admin
        const adminTemplate = getStep1AdminEmailTemplate(request);
        await SendMail({
          to: config.NODE_MILER_USER as string, // Default admin email
          subject: adminTemplate.subject,
          html: adminTemplate.html
        });

        // Mark as sent
        await ProjectRequestModel.findByIdAndUpdate(request._id, {
          isStep1EmailSent: true
        });
        
        console.log(`[Cron] Sent Step 1 notification for request ${request._id}`);
      }
    } catch (error) {
      console.error("[Cron Error] Project request notification failed:", error);
    }
  });
};
