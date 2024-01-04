import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "@/middleware/passport";

import path from "path";
import projectRouter from "@/routes/project/router";
import userRouter from "@/routes/user/router";
import tagRouter from "@/routes/tag/router";
import requestRouter from "@/routes/request/router";
import fileUpload from "express-fileupload";
import emailRouter from "@/routes/email/router";
import errorLogger from "@/middleware/errors/ErrorLogger";
import errorHandler from "@/middleware/errors/ErrorHandler";
import memberRouter from "@/routes/member/router";
import categoryRouter from "@/routes/category/router";

const generateApp = (port?: number) => {
  const app = express();
  if (port) app.listen(port, () => console.log("listening port 8000"));

  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.TOKEN_SECRET));
  app.use(
    fileUpload({
      defCharset: "utf-8",
      defParamCharset: "utf8",
    })
  );
  app.use(
    session({
      secret: process.env.TOKEN_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    })
  );
  app.set("trust proxy", 1);

  app.use(passport.initialize());

  app.use("/project", projectRouter);
  app.use("/user", userRouter);
  app.use("/tag", tagRouter);
  app.use("/request", requestRouter);
  app.use("/email", emailRouter);
  app.use("/member", memberRouter);
  app.use("/category", categoryRouter);

  app.use(errorLogger);
  app.use(errorHandler);

  return app;
};

export default generateApp;
