import { removeOldTokens } from "./remove-old-tokens.cron";

export const cronRunner = () => {
  removeOldTokens.start();
};
