import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('track-it')
      .service('myService')
      .getWelcomeMessage();
  },
});
