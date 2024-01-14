import userService from "@/services/user";
import tokenService from "..";
import tokenRepository from "@/repositories/token";
import { staticUser } from "@/entities/user";
import { UnauthorizedError } from "@/helpers/errors";

jest.mock("@/repositories/token");

jest.mock("jsonwebtoken", () => {
  const original = jest.requireActual("jsonwebtoken");
  return {
    ...original,
    verify: jest.fn(() => ({ id: 123 })),
  };
});

jest.mock("@/services/user");
jest.mock("@/repositories/token");

describe("tokenService", () => {
  describe("generate method", () => {
    it("should return two tokens", async () => {
      const testUserId = 123;

      const result = await tokenService.generate(testUserId);

      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();

      expect(typeof result.accessToken).toBe("string");
      expect(typeof result.refreshToken).toBe("string");
    });
  });

  describe("refreshAccess method", () => {
    it("should return an access token if everything is okay", async () => {
      (tokenRepository.get as jest.Mock).mockReturnValueOnce("refresh-token");
      (userService.findById as jest.Mock).mockReturnValueOnce(staticUser);

      const result = await tokenService.refreshAccess("refresh-token");
      expect(result).toBeDefined();
      expect(typeof result).toEqual("string");
    });

    it("should throw an UnauthorizedError if the refresh token is not in the database", async () => {
      (tokenRepository.get as jest.Mock).mockReturnValueOnce(null);

      expect(tokenService.refreshAccess("refresh-token")).rejects.toThrow(
        UnauthorizedError
      );
    });

    it("should throw an UnauthorizedError if the refresh token in the database is not the same as the provided one", async () => {
      (tokenRepository.get as jest.Mock).mockReturnValueOnce(
        "some-other-refresh-token"
      );

      expect(tokenService.refreshAccess("refresh-token")).rejects.toThrow(
        UnauthorizedError
      );
    });

    it("should throw an UnauthorizedError if the user was not found in the database", () => {
      (tokenRepository.get as jest.Mock).mockReturnValueOnce("refresh-token");
      (userService.findById as jest.Mock).mockReturnValueOnce(null);

      expect(tokenService.refreshAccess("refresh-token")).rejects.toThrow(
        UnauthorizedError
      );
    });
  });
});
