import { BadRequestError, UnauthorizedError } from "@/helpers/errors";
import formResultService from "@/services/form-result";
import profileService from "@/services/profile";
import projectStatusService from "@/services/project-status";
import { NextFunction, Request, Response } from "express";

const userControllerFactory = () => {
  return Object.freeze({
    getProjectStatusData,
    getUser,
    submitForm,
    getProfileData,
  });

  async function getProjectStatusData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user)
        throw new UnauthorizedError(
          "req.user not specified in userController.getProjectStatusData"
        );

      if (!req.params.projectId)
        throw new BadRequestError("Missing project identifier");

      const info = await projectStatusService.getAssignableTeams(
        +req.params.projectId,
        req.user.id
      );

      res.status(200).json(info);
    } catch (err) {
      next(err);
    }
  }

  async function submitForm(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers.authorization) {
        throw new UnauthorizedError("No credentials sent");
      }
      const token = req.headers.authorization.split(" ")[1];
      if (!token) throw new UnauthorizedError("No credentials sent");
      if (token != process.env.SUBMIT_FORM_TOKEN)
        throw new UnauthorizedError("Invalid credentials");

      if (!req.body.form)
        throw new BadRequestError("Missing required body parameter: form");
      if (!req.body.response)
        throw new BadRequestError("Missing required body parameter: response");

      const form = req.body.form;
      const response = req.body.response;

      if (!form.hasOwnProperty("id"))
        throw new BadRequestError("Form must have an identificator");
      if (!response.hasOwnProperty("data"))
        throw new BadRequestError("Response must have a body");
      const result = await formResultService.submit(form.id, response.data);
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  }

  async function getProfileData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) throw new UnauthorizedError("req.user not specified");

      const result = await profileService.getUserData(req.user);

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async function getUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new UnauthorizedError("req.user not specified");

      res.status(200).send(req.user);
    } catch (err) {
      next(err);
    }
  }
};

const userController = userControllerFactory();

export default userController;
