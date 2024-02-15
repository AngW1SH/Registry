import { staticUser } from "@/entities/user";
import profileService from "..";
import userRepository from "@/repositories/user";

jest.mock("@/repositories/user");

describe("profileService", () => {
  describe("editAccountData method", () => {
    it("should be defined", () => {
      expect(profileService.editAccountData).toBeDefined();
    });
    it("should call userRepository.edit", async () => {
      await profileService.editAccountData(
        {
          email: "test",
          phone: "test",
        },
        staticUser
      );

      expect(userRepository.edit).toHaveBeenCalled();
    });
  });
  describe("editPersonalData method", () => {
    it("should be defined", () => {
      expect(profileService.editPersonalData).toBeDefined();
    });
    it("should call userRepository.edit", async () => {
      await profileService.editPersonalData(
        {
          fullName: {
            name: "test1",
            surname: "test2",
            patronymic: "test3",
          },
        },
        staticUser
      );

      expect(userRepository.edit).toHaveBeenCalled();
    });
    it("should turn fullname into string name", async () => {
      await profileService.editPersonalData(
        {
          fullName: {
            name: "test1",
            surname: "test2",
            patronymic: "test3",
          },
        },
        staticUser
      );

      expect(userRepository.edit).toHaveBeenCalledWith(
        {
          name: "test2 test1 test3",
        },
        staticUser.id
      );
    });
  });
});
