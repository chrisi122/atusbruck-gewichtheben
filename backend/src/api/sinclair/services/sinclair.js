'use strict';

/**
 * sinclair service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sinclair.sinclair');
