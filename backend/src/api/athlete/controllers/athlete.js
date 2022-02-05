"use strict";

/**
 *  athlete controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::athlete.athlete", ({ strapi }) => ({
  async exampleAction(ctx) {
    try {
      if (Array.isArray(ctx.request.body.data)) {
        const data = await strapi.db
          .query("api::athlete.athlete")
          .createMany(ctx.request.body);

        ctx.body = {
          data,
          meta: {},
        };
      } else {
        const data = await strapi.db
          .query("api::athlete.athlete")
          .create(ctx.request.body);

        ctx.body = {
          data,
          meta: {},
        };
      }
    } catch (err) {
      ctx.body = err;
    }
  },
}));
