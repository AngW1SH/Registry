import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "@/middleware/passport";
import authRouter from "@/routes/auth/router";

const generateApp = (port?: number) => {
  const app = express();
  if (port) app.listen(port, () => console.log("listening port " + port));

  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.TOKEN_SECRET));
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

  app.use("/", authRouter);

  return app;
};

export default generateApp;
