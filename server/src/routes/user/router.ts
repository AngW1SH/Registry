import express, { Request, Response } from "express";
import passport from "@/middleware/passport";

const userRouter = express();

userRouter.get(
  "/yandeexcallback",
  passport.authenticate("custom-yandex", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

userRouter.get("/try", passport.authenticate("custom-yandex"));

export default userRouter;
