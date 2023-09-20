import express from "express";
import passport from "@/../passport/";
import adminController from "@/controllers/admin";

const adminRouter = express.Router();

adminRouter.get(
  "/authenticate",
  passport.authenticate("jwt-authenticate", { session: false })
);

adminRouter.get("/unauthorize", async (req, res) => {
  try {
    adminController.unauthorize(req, res);
  } catch (err) {
    res.status(500).send();
  }
});

/*
To manually create admin users from the database
*/
adminRouter.get("/testhash/:word", async (req, res) => {
  try {
    adminController.generateHash(req, res);
  } catch (err) {
    res.status(500).send();
  }
});

adminRouter.get("/token", async (req, res) => {
  try {
    adminController.updateAccessToken(req, res);
  } catch (err) {
    res.status(500).send();
  }
});

adminRouter.post(
  "/login",
  passport.authenticate("local-login"),
  async (req, res) => {
    try {
      adminController.createTokens(req, res);
    } catch (err) {
      res.status(500).send();
    }
  }
);

export default adminRouter;
