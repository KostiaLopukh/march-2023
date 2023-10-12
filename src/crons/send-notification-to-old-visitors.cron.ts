import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { EEmailAction } from "../enums/email.action.enum";
import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "../services/email.service";

dayjs.extend(utc);

const handler = async function () {
  try {
    const date = dayjs().utc().subtract(1, "d");
    const users = await userRepository.findWithoutActivityAfterDate(
      date.toISOString(),
    );

    await Promise.all([
      users.map(async (user) => {
        await emailService.sendMail(user.email, EEmailAction.OLD_VISIT, {
          name: user.name,
        });
      }),
    ]);
  } catch (e) {
    throw new ApiError(e.message, e.status);
  }
};

export const sendNotificationToOldVisitors = new CronJob(
  "* * * * * *",
  handler,
);
