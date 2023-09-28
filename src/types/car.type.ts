import { Document } from "mongoose";

import { EProducer } from "../enums/producer.enum";

export interface ICar extends Document {
  year?: number;
  model?: string;
  producer?: EProducer;
}
