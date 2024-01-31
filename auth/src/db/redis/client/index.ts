import { Redis } from "ioredis";

const redis = new Redis({
  host: "redis",
  password: process.env.REDIS_PASSWORD!,
  port: +process.env.REDIS_PORT!,
});

export { redis };
