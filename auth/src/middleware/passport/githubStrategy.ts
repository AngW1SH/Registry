import userService from "@/services/user";
import { Strategy as GithubStrategy } from "passport-github2";

const githubStrategy = new GithubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    callbackURL: process.env.WEBSITE_URL + "/auth/githubcallback",
  },
  async function (
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any
  ) {
    const user = await userService.findOrCreate({
      email: profile.email,
      name: profile.displayName,
      services: [
        {
          provider: "github",
          value: profile.username,
        },
      ],
    });
    return done(null, user);
  }
);

export default githubStrategy;
