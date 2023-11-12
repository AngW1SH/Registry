import categoryController from "@/controllers/category";
import express from "express";

const categoryRouter = express();

categoryRouter.get("/featured", categoryController.getFeatured);

export default categoryRouter;
