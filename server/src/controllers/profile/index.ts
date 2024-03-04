import { UnauthorizedError } from "@/helpers/errors";
import profileService from "@/services/profile";
import { NextFunction, Request, Response } from "express";

const createProfileContoller = () => {
  return Object.freeze({
    editAccountData,
    editPersonalData,
  });

  async function editAccountData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user)
        throw new UnauthorizedError(
          "req.user not specified in profileController.editAccountData"
        );

      const result = await profileService.editAccountData(
        {
          email: req.body.email || "",
          phone: req.body.phone || "",
        },
        req.user
      );

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async function editPersonalData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user)
        throw new UnauthorizedError(
          "req.user not specified in profileController.editPersonalData"
        );

      const result = await profileService.editPersonalData(
        {
          fullName: {
            name: req.body.name.trim() || "",
            surname: req.body.surname.trim() || "",
            patronymic: req.body.patronymic.trim() || "",
          },
        },
        req.user
      );

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
};

const profileController = createProfileContoller();

export default profileController;
