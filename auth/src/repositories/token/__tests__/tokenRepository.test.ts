import { verify } from "jsonwebtoken";
import tokenRepository from "..";
import redis from "@/db/redis/client";

jest.mock("@/db/redis/client");

jest.mock("jsonwebtoken", () => {
  const original = jest.requireActual("jsonwebtoken");
  return {
    ...original,
    verify: jest.fn(() => ({ id: 123 })),
  };
});

describe("tokenRepository", () => {
  describe("save method", () => {
    it("should call verify to get the user's data", async () => {
      (redis.set as jest.Mock).mockResolvedValueOnce("OK");

      const result = await tokenRepository.save("refresh-token");

      expect(verify as jest.Mock).toHaveBeenCalledTimes(1);
      expect(verify).toHaveBeenCalledWith("refresh-token", expect.anything());
    });

    it("should set the token using redis", async () => {
      jest.clearAllMocks();
      (redis.set as jest.Mock).mockResolvedValueOnce("OK");

      const result = await tokenRepository.save("refresh-token");

      expect(redis.set).toHaveBeenCalledTimes(1);
      expect(redis.set).toHaveBeenCalledWith("token-123", "refresh-token");
    });
  });

  describe("get method", () => {
    it("should get the token using redis", async () => {
      jest.clearAllMocks();
      (redis.get as jest.Mock).mockResolvedValueOnce("refresh-token");

      const result = await tokenRepository.get(123);

      expect(redis.get).toHaveBeenCalledTimes(1);
      expect(redis.get).toHaveBeenCalledWith("token-123");
    });
  });

  describe("erase method", () => {
    it("should call verify to get the user's data", async () => {
      (redis.del as jest.Mock).mockResolvedValueOnce(1);

      const result = await tokenRepository.erase("refresh-token");

      expect(verify).toHaveBeenCalledTimes(1);
      expect(verify).toHaveBeenCalledWith("refresh-token", expect.anything());
    });

    it("should delete the token using redis", async () => {
      jest.clearAllMocks();
      (redis.del as jest.Mock).mockResolvedValueOnce(1);

      const result = await tokenRepository.erase("refresh-token");

      expect(redis.del).toHaveBeenCalledTimes(1);
      expect(redis.del).toHaveBeenCalledWith("token-123");
    });
  });
});
