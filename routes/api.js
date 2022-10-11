'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
const { init } = require('../server.js');

// TODO: Complete the necessary routes in /routes/api.js
module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert')
    .get((req, res) => {
      const input = req.query.input;
      const errors = [];
      let initNum, initUnit, returnUnit, returnNum, initUnitName, returnUnitName, string;
      try {
        try {
          initNum = convertHandler.getNum(input);
        } catch (error) {
          errors.push('number');
        }

        try {
          initUnit = convertHandler.getUnit(input);
        } catch(error) {
          errors.push('unit');
        }

        if(errors.length >= 1) {
          throw new Error('invalid ' + errors.join(' and '));
        } 
        

        returnUnit = convertHandler.getReturnUnit(initUnit);
        returnNum = convertHandler.convert(initNum, initUnit);

        initUnitName = convertHandler.spellOutUnit(initUnit);
        returnUnitName = convertHandler.spellOutUnit(returnUnit);

        string = `${initNum} ${initUnitName} converts to ${returnNum} ${returnUnitName}`

        res.json({
          initNum, initUnit, returnNum, returnUnit, string
        })
      }
      catch (error) {
        res.send(
          error.message
        );
      }
    })
};