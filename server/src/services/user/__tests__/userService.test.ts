import {
  staticUser,
  staticUserCreate,
  staticUserCreateResponseStrapi,
  staticUserResponseStrapi,
} from "@/entities/user";
import userRepository from "@/repositories/user";
import userService from "..";
import teamRepository from "@/repositories/team";
import { staticTeams } from "@/entities/team/static/staticTeams";

jest.mock("@/repositories/user");
jest.mock("@/repositories/team");

describe("User Service", () => {
  describe("findOrCreate method", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return an existing user if found", async () => {
      (userRepository.findOne as jest.Mock).mockResolvedValueOnce(
        staticUserResponseStrapi
      );

      const result = await userService.findOrCreate(staticUserCreate);

      expect(userRepository.findOne as jest.Mock).toBeCalledTimes(1);
      expect(userRepository.create as jest.Mock).toBeCalledTimes(0);
      expect(result).toBeDefined();
    });

    it("should create a user if not found", async () => {
      (userRepository.findOne as jest.Mock).mockResolvedValueOnce(null);
      (userRepository.create as jest.Mock).mockResolvedValueOnce(
        staticUserCreateResponseStrapi
      );

      const result = await userService.findOrCreate(staticUserCreate);

      expect(userRepository.findOne as jest.Mock).toBeCalledTimes(1);
      expect(userRepository.create as jest.Mock).toBeCalledTimes(1);
      expect(result).toBeDefined();
    });
  });

  describe("findById method", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should return an existing user if found", async () => {
      (userRepository.findOne as jest.Mock).mockResolvedValueOnce(
        staticUserResponseStrapi
      );

      const user = await userService.findById(2);

      expect(userRepository.findOne as jest.Mock).toBeCalledTimes(1);
      expect(user).toBeDefined();
    });

    it("should return null if user user is not found", async () => {
      (userRepository.findOne as jest.Mock).mockResolvedValueOnce(null);

      const user = await userService.findById(2);

      expect(userRepository.findOne as jest.Mock).toBeCalledTimes(1);
      expect(user).toBeNull();
    });
  });

  describe("getData method", () => {
    beforeEach(() => {
      jest.clearAllMocks();

      (teamRepository.getUnassigned as jest.Mock).mockResolvedValue(
        staticTeams
      );
      (
        teamRepository.getUnassignedAdministrated as jest.Mock
      ).mockResolvedValue(staticTeams);
    });
    it("should throw an error if the user is not found", async () => {
      expect(async () => userService.getData(null as any)).rejects.toThrow();
    });
    it("should fetch the user's unassigned teams and unassigned administrated teams", async () => {
      const user = staticUser;

      const result = await userService.getData(user);

      expect(teamRepository.getUnassigned).toBeCalledTimes(1);
      expect(teamRepository.getUnassignedAdministrated).toBeCalledTimes(1);
    });
    it("should return the user's data and teams", async () => {
      const user = staticUser;

      const result = await userService.getData(user);

      expect(result.teams).toBeDefined();
      expect(result.user).toBeDefined();
    });
  });
});
