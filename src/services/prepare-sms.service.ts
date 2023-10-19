import { smsTemplates } from "../constants/sms.constant";
import { ESmsAction } from "../enums/sms.action.enum";
import { smsService } from "./sms.service";

class PrepareSmsService {
  public async register(
    number: string,
    context: { name: string },
  ): Promise<void> {
    const message = smsTemplates[ESmsAction.REGISTER](context.name);

    await smsService.sendSms(number, message);
  }
}

export const prepareSmsService = new PrepareSmsService();
