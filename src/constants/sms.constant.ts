import { ESmsAction } from "../enums/sms.action.enum";

export const smsTemplates = {
  [ESmsAction.REGISTER]: (name: string) =>
    `Hey, ${name}! \n Great to see u in our platform.`,
};
