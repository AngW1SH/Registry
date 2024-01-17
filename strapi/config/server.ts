export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 7000),
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
  url: env("STRAPI_URL", "http://localhost/strapi"),
  admin: {
    url: env("STRAPI_URL", "http://localhost/strapi") + "/admin",
    auth: {
      secret: env("JWT_SECRET", "<hide>"),
    },
  },
});
