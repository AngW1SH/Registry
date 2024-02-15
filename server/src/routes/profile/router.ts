import express from "express";
import passport from "@/middleware/passport";
import profileController from "@/controllers/profile";

const profileRouter = express();

profileRouter.put(
  "/account",
  passport.authenticate("jwt-authenticate"),
  profileController.editAccountData
);

profileRouter.put(
  "/personal",
  passport.authenticate("jwt-authenticate"),
  profileController.editPersonalData
);

export default profileRouter;
