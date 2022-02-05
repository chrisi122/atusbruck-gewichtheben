"use strict";

module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "POST",
      path: "/test",
      handler: "athlete.exampleAction",
    },
  ],
};
