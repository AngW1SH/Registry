import { BadRequestError } from "@/helpers/errors";
import emailService from "@/services/email";
import { NextFunction, Request, Response } from "express";

const emailControllerFactory = () => {
  return Object.freeze({
    send,
  });

  async function send(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.method !== "POST")
        throw new BadRequestError("Unsupported method");
      if (!req.body.name) throw new BadRequestError("Missing name");
      if (!req.body.email) throw new BadRequestError("Missing email");

      const result = await emailService.send({
        name: req.body.name,
        email: req.body.email,
      });

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
};

const emailController = emailControllerFactory();

export default emailController;
