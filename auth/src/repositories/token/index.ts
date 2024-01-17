import jwt, { JwtPayload, verify } from "jsonwebtoken";
import { Redis } from "ioredis";

const redis = new Redis({
  host: "redis",
  password: process.env.REDIS_PASSWORD!,
  port: +process.env.REDIS_PORT!,
});

const tokenRepositoryFactory = () => {
  return Object.freeze({ save, get, erase });

  async function save(refreshToken: string) {
    const { id: userId } = verify(refreshToken, process.env.TOKEN_SECRET!) as {
      id: number;
    };

    await redis.set("token-" + userId, refreshToken);
  }

  async function get(userId: number) {
    return redis.get("token-" + userId);
  }

  async function erase(refreshToken: string) {
    const { id: userId } = verify(refreshToken, process.env.TOKEN_SECRET!) as {
      id: number;
    };
    return redis.del("token-" + userId);
  }
};

const tokenRepository = tokenRepositoryFactory();

export default tokenRepository;
