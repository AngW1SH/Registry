import userRepository from "@/repositories/user";
import * as getEmailFromFormResults from "../utils/getEmailFromFormResults";
import { staticUser } from "@/entities/user";
import formRepository from "@/repositories/form";
import { staticForms } from "@/entities/form";
import { BadRequestError, ServerError } from "@/helpers/errors";
import formResultService from "..";
import formResultRepository from "@/repositories/form-result";

global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

jest.mock("@/repositories/user");
jest.mock("@/repositories/form");
jest.mock("@/repositories/form-result");

describe("formRepositoryService", () => {
  describe("submit method", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should get the email from the form response", async () => {
      const formId = 123;
      const response = [
        {
          question: "Электронная почта, указанная при авторизации",
          answer: "test@test.com",
        },
      ];

      (userRepository.findOne as jest.Mock).mockResolvedValue(staticUser);
      (formRepository.findOne as jest.Mock).mockResolvedValue(staticForms[0]);

      const emailSpy = jest.spyOn(
        getEmailFromFormResults,
        "getEmailFromFormResults"
      );

      const result = await formResultService.submit(formId, response);

      expect(emailSpy).toHaveBeenCalledWith(expect.objectContaining(response));
    });

    it("should throw a BadRequestError if the email is not found", async () => {
      const formId = 123;
      const response = [
        {
          question: "Имя",
          answer: "John Doe",
        },
      ];

      (formRepository.findOne as jest.Mock).mockResolvedValue(staticForms[0]);

      await expect(formResultService.submit(formId, response)).rejects.toThrow(
        BadRequestError
      );
    });

    it("should search for a user in the database", async () => {
      const formId = 123;
      const response = [
        {
          question: "Электронная почта, указанная при авторизации",
          answer: "test@test.com",
        },
      ];

      (userRepository.findOne as jest.Mock).mockResolvedValue(staticUser);
      (formRepository.findOne as jest.Mock).mockResolvedValue(staticForms[0]);

      const result = await formResultService.submit(formId, response);

      expect(userRepository.findOne).toHaveBeenCalledWith(
        expect.objectContaining({ email: "test@test.com" })
      );
    });

    it("should throw a ServerError if the user is not found", async () => {
      const formId = 123;
      const response = [
        {
          question: "Электронная почта, указанная при авторизации",
          answer: "test@test.com",
        },
      ];

      (userRepository.findOne as jest.Mock).mockResolvedValue(null);
      (formRepository.findOne as jest.Mock).mockResolvedValue(staticForms[0]);

      await expect(formResultService.submit(formId, response)).rejects.toThrow(
        ServerError
      );
    });

    it("should search for a form in the database", async () => {
      const formId = 123;
      const response = [
        {
          question: "Электронная почта, указанная при авторизации",
          answer: "test@test.com",
        },
      ];

      (userRepository.findOne as jest.Mock).mockResolvedValue(staticUser);
      (formRepository.findOne as jest.Mock).mockResolvedValue(staticForms[0]);

      const result = await formResultService.submit(formId, response);

      expect(formRepository.findOne).toHaveBeenCalledWith(
        expect.objectContaining({ formId: formId })
      );
    });

    it("should throw a ServerError if the form is not found", async () => {
      const formId = 123;
      const response = [
        {
          question: "Электронная почта, указанная при авторизации",
          answer: "test@test.com",
        },
      ];

      (userRepository.findOne as jest.Mock).mockResolvedValue(staticUser);
      (formRepository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(formResultService.submit(formId, response)).rejects.toThrow(
        ServerError
      );
    });

    it("should throw a BadRequest error if the formId is not provided", async () => {
      const formId = undefined;
      const response = [
        {
          question: "Электронная почта, указанная при авторизации",
          answer: "test@test.com",
        },
      ];

      (userRepository.findOne as jest.Mock).mockResolvedValue(staticUser);

      await expect(
        formResultService.submit(formId as any, response)
      ).rejects.toThrow(BadRequestError);
    });

    it("should call the formRepository.submit method if everything is okay", async () => {
      const formId = 123;
      const response = [
        {
          question: "Электронная почта, указанная при авторизации",
          answer: "test@test.com",
        },
      ];

      (userRepository.findOne as jest.Mock).mockResolvedValue(staticUser);
      (formRepository.findOne as jest.Mock).mockResolvedValue(staticForms[0]);

      const result = await formResultService.submit(formId, response);

      expect(formResultRepository.submit).toHaveBeenCalledWith(
        staticForms[0].id,
        expect.arrayContaining(response),
        staticUser.id
      );
    });
  });
});
