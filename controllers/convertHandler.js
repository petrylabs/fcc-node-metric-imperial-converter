const units = require('./units.json').units;
/*
** TODO: Complete the necessary conversion logic in /controllers/convertHandler.js
*/
function ConvertHandler() {

  this.units = units;
  
  this.getNum = function(input) {
    const regex = /^(\d+\.?\d*\/?\d*\.?\d*)?([a-zA-Z]*)$/
    const match = input.match(regex);
    if(match)
      return eval(match.at(1)) || 1;
    else
      throw new Error('invalid number');
  };
  
  this.getUnit = function(input) {
    if(input.length == 0)
      throw new Error('Invalid input.');
    const regex = /[a-zA-Z]+/
    const match = input.match(regex);
    if(match == null)
    throw new Error('No unit provided.');
    const unitSymbol = match.at(0).toLowerCase();
    const matchingUnit = this.units.find(unit => unit.symbol.toLowerCase() == unitSymbol.toLowerCase());
    if(matchingUnit)
      return matchingUnit.symbol
    else
      throw new Error('invalid unit');
  };
  
  this.getReturnUnit = function(initUnit) {
    const returnUnit = this.units.find(unit => unit.conversion.unit == initUnit)
    return returnUnit ? returnUnit.symbol : null;
  };

  this.spellOutUnit = function(unitSymbol) {
    const targetUnit = this.units.find(unit => unit.symbol == unitSymbol);
    return targetUnit ? targetUnit.name : null;
  };

  this.getConversionRatio = function(initUnit) {
    const targetUnit = this.units.find(unit => unit.symbol == initUnit);
    return targetUnit ? targetUnit.conversion.ratio : null;
  }
  
  this.convert = function(initNum, initUnit) {
    const conversionRatio = this.getConversionRatio(initUnit);
    return Number((initNum * conversionRatio).toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
