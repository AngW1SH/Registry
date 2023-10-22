import requestService from "@/services/request";
import { Request, Response } from "express";

const requestControllerFactory = () => {
  return Object.freeze({
    add,
  });

  async function add(req: Request, res: Response) {
    try {
      if (
        !req.body.team ||
        !req.body.project ||
        Object.keys(req.files).length === 0
      )
        return res.status(400).send();

      if (!req.user) return res.status(401).send();

      const result = await requestService.add(
        req.body.team,
        req.body.project,
        req.user,
        Array.isArray(req.files.files) ? req.files.files : [req.files.files]
      );

      res.status(200).send();
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

const requestController = requestControllerFactory();

export default requestController;
