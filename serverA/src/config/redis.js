import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export default new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});
