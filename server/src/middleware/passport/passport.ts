import passport from "passport";

import loginStrategy from "./loginStrategy";
import authenticateStrategy from "./authenticateStrategy";
import customYandexStrategy from "./customYandexStrategy";
import userRepository from "@/repositories/user";

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user["id"]);
  });
});

passport.deserializeUser(function (id, cb) {
  return userRepository
    .findById(+id)
    .then((user) => {
      return cb(null, user);
    })
    .catch((err) => cb(err));
});

passport.use("jwt-authenticate", authenticateStrategy);
passport.use("local-login", loginStrategy);
passport.use("custom-yandex", customYandexStrategy);

export default passport;
