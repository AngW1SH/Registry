import passport from "passport";

import authenticateStrategy from "./authenticateStrategy";
import userRepository from "@/repositories/user";

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

export default passport;
