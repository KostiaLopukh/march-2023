import { removeOldTokens } from "./remove-old-tokens.cron";
import { sendNotificationToOldVisitors } from "./send-notification-to-old-visitors.cron";

export const cronRunner = () => {
  removeOldTokens.start();
  sendNotificationToOldVisitors.start();
};
