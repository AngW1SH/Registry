import tokenService from "..";

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
});
