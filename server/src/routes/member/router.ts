import express from "express";
import passport from "@/middleware/passport";
import memberController from "@/controllers/member";

const memberRouter = express();

memberRouter.put(
  "/",
  passport.authenticate("jwt-authenticate"),
  memberController.edit
);

export default memberRouter;
