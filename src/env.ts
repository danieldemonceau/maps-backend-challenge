import * as dotenv from 'dotenv';
import { cleanEnv, str } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  TOMTOM_API_KEY: str({ desc: 'TomTom API Key' }),
});