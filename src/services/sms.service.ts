import { Twilio } from "twilio";

import { configs } from "../configs/config";
import { smsTemplates } from "../constants/sms.constant";
import { ESmsAction } from "../enums/sms.action.enum";

class SmsService {
  constructor(
    private readonly client = new Twilio(
      configs.TWILIO_ACCOUNT_SID,
      configs.TWILIO_AUTH_TOKEN,
    ),
  ) {}

  public async sendSms(number: string, message: string): Promise<void> {
    try {
      const result = await this.client.messages.create({
        body: message,
        to: number,
        messagingServiceSid: configs.TWILIO_SERVICE_SID,
      });
      console.log(result);
    } catch (e) {
      console.error(e.message);
    }
  }
}

export const smsService = new SmsService();
