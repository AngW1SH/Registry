import emailService from "@/services/email";
import { Request, Response } from "express";

const emailControllerFactory = () => {
  return Object.freeze({
    send,
  });

  async function send(req: Request, res: Response) {
    try {
      if (req.method !== "POST")
        return res.status(400).send("Unsupported method");
      if (!req.body.name) return res.status(400).send("Missing name");
      if (!req.body.email) return res.status(400).send("Missing email");

      const result = await emailService.send({
        name: req.body.name,
        email: req.body.email,
      });

      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

const emailController = emailControllerFactory();

export default emailController;
