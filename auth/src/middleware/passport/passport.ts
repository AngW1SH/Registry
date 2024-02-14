import passport from "passport";

import authenticateStrategy from "./authenticateStrategy";
import customYandexStrategy from "./customYandexStrategy";
import userRepository from "@/repositories/user";
import githubStrategy from "./githubStrategy";

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user["id"]);
  });
});

passport.deserializeUser(function (id: number, cb) {
  return userRepository
    .findOne({ id: +id })
    .then((user) => {
      return cb(null, user);
    })
    .catch((err) => cb(err));
});

passport.use("jwt-authenticate", authenticateStrategy);
passport.use("sso-strategy", customYandexStrategy);
passport.use("github-strategy", githubStrategy);

export default passport;
