import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "./passport/index";

import projectRouter from "@/routes/project/router";
import adminRouter from "@/routes/admin/router";

const app = express();
app.listen(8000, () => console.log("listening port 8000"));

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

app.use(projectRouter);
