import categoryService from "@/services/category";
import { NextFunction, Request, Response } from "express";

const categoryControllerFactory = () => {
  return Object.freeze({ getFeatured });

  async function getFeatured(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await categoryService.getFeatured();
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
};

const categoryController = categoryControllerFactory();

export default categoryController;
