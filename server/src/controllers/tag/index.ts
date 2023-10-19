import tagService from "@/services/tag";
import { Request, Response } from "express";

const tagControllerFactory = () => {
  return Object.freeze({
    findInFilters,
  });

  async function findInFilters(req: Request, res: Response) {
    try {
      if (req.method !== "POST" && req.method !== "GET")
        return res.status(400).send("Unsupported HTTP-method");

      const result = await tagService.findInFilters(
        req.body.query || req.params.query
      );

      res.status(200).send(result);
    } catch (err) {
      res.status(500).send();
    }
  }
};

const tagController = tagControllerFactory();

export default tagController;
