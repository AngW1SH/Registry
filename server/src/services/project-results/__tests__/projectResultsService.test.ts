import { staticUser } from "@/entities/user";
import projectResultsService from "..";
import projectRepository from "@/repositories/project";
import { ServerError, UnauthorizedError } from "@/helpers/errors";
import { staticProjectList } from "@/entities/project";
import projectResultsRepository from "@/repositories/project-results";

jest.mock("@/repositories/project");
jest.mock("@/repositories/project-results");

describe("projectResultsService", () => {
  describe("uploadFiles methid", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should fetch the project", async () => {
      try {
        await projectResultsService.uploadFiles("1", [], staticUser);
      } catch {}

      expect(projectRepository.findOne).toHaveBeenCalled();
    });

    it("should throw an error if the project is not in DB", async () => {
      (projectRepository.findOne as jest.Mock).mockReturnValueOnce(null);

      expect(
        projectResultsService.uploadFiles("1", [], staticUser)
      ).rejects.toThrow(ServerError);
    });

    it("should throw an error if the project's administrators property is not defined", async () => {
      (projectRepository.findOne as jest.Mock).mockReturnValueOnce({
        project: staticProjectList[0],
      });

      expect(
        projectResultsService.uploadFiles("1", [], staticUser)
      ).rejects.toThrow(ServerError);
    });

    it("should throw an error if the user is not a project's administrator", async () => {
      (projectRepository.findOne as jest.Mock).mockReturnValueOnce({
        project: staticProjectList[0],
        administrators: [
          {
            id: 1,
            name: "Test",
            email: "test@test.com",
          },
        ],
      });

      const user = {
        id: 2,
        name: "User",
        email: "user@test.com",
      };

      expect(projectResultsService.uploadFiles("1", [], user)).rejects.toThrow(
        UnauthorizedError
      );

      expect(
        projectResultsService.uploadFiles("1", [], staticUser)
      ).rejects.toThrow(ServerError);
    });

    it("should call the repository's addFiles method if everything is ok", async () => {
      const user = {
        id: 2,
        name: "User",
        email: "user@test.com",
      };

      (projectRepository.findOne as jest.Mock).mockReturnValueOnce({
        project: staticProjectList[0],
        administrators: [user],
      });

      await projectResultsService.uploadFiles("1", [], user);

      expect(projectResultsRepository.addFiles).toHaveBeenCalled();
    });
  });

  describe("deleteFile method", () => {
    it("should fetch the project", async () => {
      try {
        await projectResultsService.deleteFile("1", 1, staticUser);
      } catch {}

      expect(projectRepository.findOne).toHaveBeenCalled();
    });

    it("should throw an error if the project is not in DB", async () => {
      (projectRepository.findOne as jest.Mock).mockReturnValueOnce(null);

      expect(
        projectResultsService.deleteFile("1", 1, staticUser)
      ).rejects.toThrow(ServerError);
    });

    it("should throw an error if the project's administrators property is not defined", async () => {
      (projectRepository.findOne as jest.Mock).mockReturnValueOnce({
        project: staticProjectList[0],
      });

      expect(
        projectResultsService.deleteFile("1", 1, staticUser)
      ).rejects.toThrow(ServerError);
    });

    it("should throw an error if the user is not a project's administrator", async () => {
      (projectRepository.findOne as jest.Mock).mockReturnValueOnce({
        project: staticProjectList[0],
        administrators: [
          {
            id: 1,
            name: "Test",
            email: "test@test.com",
          },
        ],
      });

      const user = {
        id: 2,
        name: "User",
        email: "user@test.com",
      };

      expect(projectResultsService.deleteFile("1", 1, user)).rejects.toThrow(
        UnauthorizedError
      );

      expect(
        projectResultsService.deleteFile("1", 1, staticUser)
      ).rejects.toThrow(ServerError);
    });

    it("should call the repository's addFiles method if everything is ok", async () => {
      const user = {
        id: 2,
        name: "User",
        email: "user@test.com",
      };

      (projectRepository.findOne as jest.Mock).mockReturnValueOnce({
        project: staticProjectList[0],
        administrators: [user],
      });

      await projectResultsService.deleteFile("1", 1, user);

      expect(projectResultsRepository.deleteFile).toHaveBeenCalled();
    });
  });
});
