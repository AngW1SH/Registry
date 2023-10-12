import {
  staticUserCreate,
  staticUserCreateResponseStrapi,
  staticUserResponseStrapi,
} from "@/entities/user";
import userRepository from "@/repositories/user";
import userService from "..";

jest.mock("@/repositories/user");

describe("User Service", () => {
  describe("findOrCreate method", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return an existing user if found", async () => {
      (userRepository.findByEmail as jest.Mock).mockResolvedValueOnce(
        staticUserResponseStrapi
      );

      const result = await userService.findOrCreate(staticUserCreate);

      expect(userRepository.findByEmail as jest.Mock).toBeCalledTimes(1);
      expect(userRepository.create as jest.Mock).toBeCalledTimes(0);
      expect(result).toBeDefined();
    });

    it("should create a user if not found", async () => {
      (userRepository.findByEmail as jest.Mock).mockResolvedValueOnce(null);
      (userRepository.create as jest.Mock).mockResolvedValueOnce(
        staticUserCreateResponseStrapi
      );

      const result = await userService.findOrCreate(staticUserCreate);

      expect(userRepository.findByEmail as jest.Mock).toBeCalledTimes(1);
      expect(userRepository.create as jest.Mock).toBeCalledTimes(1);
      expect(result).toBeDefined();
    });
  });
});
