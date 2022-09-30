'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

// TODO: Complete the necessary routes in /routes/api.js
module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert')
    .get(convertHandler)
};
