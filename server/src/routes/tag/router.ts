import tagController from "@/controllers/tag";
import express from "express";

const tagRouter = express();

tagRouter.get("/filters/:query?", tagController.findInFilters);

tagRouter.post("/filters", tagController.findInFilters);

export default tagRouter;
