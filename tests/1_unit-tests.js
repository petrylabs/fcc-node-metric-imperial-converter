const units = require('../controllers/units.json').units;

const chai = require('chai');
let assert = chai.assert;
let expect = chai.expect;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('Input Number Assertions', function () {
        test('convertHandler should correctly read a whole number input.', function () {
            const input = '55'; 
            const result = convertHandler.getNum(input);
            assert.equal(result, parseInt(input));
        })
        test('convertHandler should correctly read a decimal number input', function () {
            const input = '55.55'; 
            const result = convertHandler.getNum(input);
            assert.equal(result, parseFloat(input));
        })
        test('convertHandler should correctly read a fractional input.', function () {
            const input = '1/2'; 
            const fractionalInput = eval(input);
            const result = convertHandler.getNum(input);
            assert.equal(result, fractionalInput);
        })
        // convertHandler should correctly read a fractional input with a decimal.
        test('convertHandler should correctly read a fractional input.', function () {
            const input = '999.999/3'; 
            const fractionalInput = eval(input);
            const result = convertHandler.getNum(input);
            assert.equal(result, fractionalInput);
        })
        test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function () {
            const input = '3/2/3';
            const fn = () => convertHandler.getNum(input);
            const expectedResult = 'invalid number'
            assert.throws(fn, expectedResult);
        });
        test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
            const input = '';
            const result = convertHandler.getNum(input);
            const expectedResult = 1;
            assert.equal(result, expectedResult);
        });
    })
    suite('Input Unit Assertions', function () {
        test('convertHandler should correctly read each valid input unit.', function () {
            const input = '1 km';
            const result = convertHandler.getUnit(input);
            const expectedResult = 'km';
            assert.equal(result, expectedResult);
        })
        test('convertHandler should correctly return an error for an invalid input unit.', function() {
            const input = '1 gbp';
            const fn = () => convertHandler.getUnit(input);
            const expectedResult = 'invalid unit';
            assert.throw(fn, expectedResult);
        });
        test('convertHandler should return the correct return unit for each valid input unit.', function() {
            const input = '1 km';
            const initUnit = convertHandler.getUnit(input);
            const result = convertHandler.getReturnUnit(initUnit);
            const expectedResult = 'mi';
            assert.equal(result, expectedResult);
        });
        test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function () {
            const input = '1 mi';
            const unitSymbol = convertHandler.getUnit(input);
            const result = convertHandler.spellOutUnit(unitSymbol);
            const expectedResult = 'miles';
            assert.equal(result, expectedResult);
        });
    })
    suite('Conversion Assertions', function () {
        test('convertHandler should correctly convert gal to L.', function() {
            const input = '1gal';
            const initNum = convertHandler.getNum(input);
            const initUnit = convertHandler.getUnit(input);
            const result = convertHandler.convert(initNum, initUnit);
            const expectedResult = 3.78541;
            assert.equal(result, expectedResult);
        })
        test('convertHandler should correctly convert gal to L.', function() {
            const input = '1L';
            const initNum = convertHandler.getNum(input);
            const initUnit = convertHandler.getUnit(input);
            const result = convertHandler.convert(initNum, initUnit);
            const expectedResult = 0.26417;
            assert.equal(result, expectedResult);
        })
        test('convertHandler should correctly convert mi to km.', function() {
            const input = '1mi';
            const initNum = convertHandler.getNum(input);
            const initUnit = convertHandler.getUnit(input);
            const result = convertHandler.convert(initNum, initUnit);
            const expectedResult = 1.60934;
            assert.equal(result, expectedResult);
        })
        test('convertHandler should correctly convert km to mi.', function() {
            const input = '1km';
            const initNum = convertHandler.getNum(input);
            const initUnit = convertHandler.getUnit(input);
            const result = convertHandler.convert(initNum, initUnit);
            const expectedResult = 0.62137;
            assert.equal(result, expectedResult);
        })
        test('convertHandler should correctly convert lbs to kg.', function() {
            const input = '1lbs';
            const initNum = convertHandler.getNum(input);
            const initUnit = convertHandler.getUnit(input);
            const result = convertHandler.convert(initNum, initUnit);
            const expectedResult = 0.45359;
            assert.equal(result, expectedResult);
        })
        test('convertHandler should correctly convert kg to lbs.', function() {
            const input = '1kg';
            const initNum = convertHandler.getNum(input);
            const initUnit = convertHandler.getUnit(input);
            const result = convertHandler.convert(initNum, initUnit);
            const expectedResult = 2.20462;
            assert.equal(result, expectedResult);
        })
    })
});