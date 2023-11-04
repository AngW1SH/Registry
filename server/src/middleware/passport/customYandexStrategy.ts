/**
 * Module dependencies.
 */
import userService from "@/services/user";
import { OAuth2 } from "oauth";
import OAuth2Strategy, { InternalOAuthError } from "passport-oauth2";

class CustomYandexStrategy extends OAuth2Strategy {
  name: string;

  constructor(options: any, verify: any) {
    options = options || {};
    options.authorizationURL =
      options.authorizationURL || "https://oauth.yandex.ru/authorize";
    options.tokenURL = options.tokenURL || "https://oauth.yandex.ru/token";

    super(options, verify);
    this.name = "yandex";

    // NOTE: Due to OAuth 2.0 implementations arising at different points and
    //       drafts in the specification process, the parameter used to denote the
    //       access token is not always consistent.    As of OAuth 2.0 draft 22,
    //       the parameter is named "access_token".  However, yandex's
    //       implementation expects it to be named "oauth_token".  For further
    //       information, refer to: http://api.yandex.ru/oauth/doc/dg/concepts/ya-oauth-intro.xml
    this._oauth2.setAccessTokenName("oauth_token");
  }

  userProfile(accessToken: string, done: any) {
    var url = "https://login.yandex.ru/info?format=json";

    this._oauth2.get(url, accessToken, function (err, body, res) {
      if (err) {
        return done(
          new InternalOAuthError("failed to fetch user profile", err)
        );
      }

      try {
        var json = JSON.parse(body as string);

        var profile: any = { provider: "yandex" };
        profile.id = json.id;
        profile.username = json.display_name;
        profile.displayName = json.display_name;
        if (json.real_name) {
          var tokens = json.real_name.split(" ", 2);
          profile.name = { familyName: tokens[0], givenName: tokens[1] };
        } else {
          profile.name = {};
        }
        profile.gender = json.sex;
        profile.emails = [{ value: json.default_email }];

        if (json.default_avatar_id) {
          profile.photos = [
            {
              value:
                "https://avatars.yandex.net/get-yapic/" +
                json.default_avatar_id +
                "/islands-200",
              type: "thumbnail",
            },
          ];
        }

        profile._raw = body;
        profile._json = json;

        done(null, profile);
      } catch (e) {
        done(e);
      }
    });
  }
}

const customYandexStrategy = new CustomYandexStrategy(
  {
    authorizationURL: "https://oauth.yandex.ru/authorize",
    tokenURL: "https://oauth.yandex.ru/token",
    clientID: process.env.CUSTOM_YANDEX_CLIENT_ID,
    clientSecret: process.env.CUSTOM_YANDEX_CLIENT_SECRET,
    callbackURL: process.env.WEBSITE_URL + "/api/user/yandeexcallback",
  },
  async function (
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any
  ) {
    const user = await userService.findOrCreate({
      email:
        profile.default_email?.toLowerCase() ||
        profile.emails[0].value.toLowerCase(),
      name: profile.displayName,
    });
    return done(null, user);
  }
);

export default customYandexStrategy;
