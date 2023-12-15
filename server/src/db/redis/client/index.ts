import { Redis } from "ioredis";

const redis = new Redis({
  password: process.env.REDIS_PASSWORD!,
  port: +process.env.REDIS_PORT!,
});

export default redis;
