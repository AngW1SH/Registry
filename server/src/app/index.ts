import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "@/middleware/passport";

import path from "path";
import projectRouter from "@/routes/project/router";
import adminRouter from "@/routes/admin/router";

const generateApp = (port?: number) => {
  const app = express();
  if (port) app.listen(port, () => console.log("listening port 8000"));

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.TOKEN_SECRET));
  app.use(
    session({
      secret: process.env.TOKEN_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/admin", adminRouter);

  app.use("/project", projectRouter);

  app.use("/public", express.static(path.resolve(__dirname + "/../public")));

  app.get("/", (req: Request, res: Response) => {
    res
      .status(200)
      .sendFile(path.resolve(__dirname + "/../client/dist/index.html"));
  });

  app.use(
    "/assets",
    express.static(path.resolve(__dirname + "/../client/dist/assets"))
  );

  return app;
};

export default generateApp;
