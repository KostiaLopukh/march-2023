import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { ApiError } from "../errors/api.error";
import { tokenRepository } from "../repositories/token.repository";

dayjs.extend(utc);

const tokensRemover = async function () {
  try {
    const previousMonth = dayjs().utc().subtract(30, "d");

    await tokenRepository.deleteManyByParams({
      createdAt: { $lte: previousMonth },
    });
  } catch (e) {
    throw new ApiError(e.message, e.status);
  }

  // lte = less than equal
  // gte = greater than equal
  // gt = greater than
  // lt = less than
};

export const removeOldTokens = new CronJob("* * * * * *", tokensRemover);
