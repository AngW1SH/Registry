import userRoleController from "@/controllers/user-role";
import express from "express";

const userRoleRouter = express.Router();

userRoleRouter.get("/:query", userRoleController.findInFilters);

userRoleRouter.post("/", userRoleController.findInFilters);

userRoleRouter.get("/", userRoleController.findInFilters);

export default userRoleRouter;
