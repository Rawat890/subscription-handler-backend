import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { PORT, MONGO_URL, JWT_SECRET, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, NODE_ENV, ARCJET_KEY, ARCJET_ENV, QSTASH_TOKEN, QSTASH_URL, SERVER_URL } = process.env;
