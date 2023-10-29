import redis from "@/db/redis/client";
import jwt, { JwtPayload, verify } from "jsonwebtoken";

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
