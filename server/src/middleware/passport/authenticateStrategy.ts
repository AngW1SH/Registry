import { Strategy as JWTStrategy } from "passport-jwt";
import { prisma } from "@/db/prisma-client";
import { Request } from "express";
import userService from "@/services/user";

const opts: any = {};
opts.jwtFromRequest = function (req: Request) {
  let token = "";
  if (req && req.signedCookies) {
    token = req.signedCookies["user-access"];
  }
  return token;
};
opts.secretOrKey = process.env.TOKEN_SECRET;

const authenticateStrategy = new JWTStrategy(opts, function (
  jwt_payload,
  done
) {
  userService.findById(jwt_payload.id).then((user) => {
    if (user) return done(null, user);

    return done(null, false);
  });
});

export default authenticateStrategy;
