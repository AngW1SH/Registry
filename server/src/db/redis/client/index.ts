import { Redis } from "ioredis";

const redis = new Redis({
  username: process.env.REDIS_LOGIN!,
  password: process.env.REDIS_PASSWORD!,
});

export default redis;
