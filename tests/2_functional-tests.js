const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    this.timeout(5000);
    suite('Integration tests with chai-http', function(){
        test('Convert a valid input such as 10L: GET request to /api/convert.', function(done) {
            chai.request(server)
            .get('/api/convert?input=10L')
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 10);
                assert.equal(res.body.initUnit, 'L');
                assert.closeTo(res.body.returnNum, 2.64, 0.01);
                assert.equal(res.body.returnUnit, 'gal');
            })
            done();
        });
        test('Convert an invalid input such as 32g: GET request to /api/convert.', function(done) {
            chai.request(server)
            .get('/api/convert?input=32g')
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.include(res.text, 'invalid unit');
            })
            done();
        });
        test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.', function(done) {
            chai.request(server)
            .get('/api/convert?input=3/7.2/4kg')
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.include(res.text, 'invalid number');
            })
            done();
        });
        test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.', function(done) {
            chai.request(server)
            .get('/api/convert?input=3/7.2/4kilomegagram')
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.include(res.text, 'invalid number and unit');
            })
            done();
        });
        test('Convert with no number such as kg: GET request to /api/convert.', function(done) {
            chai.request(server)
            .get('/api/convert?input=kg')
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 1);
                assert.equal(res.body.initUnit, 'kg');
                assert.closeTo(res.body.returnNum, 2.20, 0.01);
                assert.equal(res.body.returnUnit, 'lbs');
            })
            done();
        })
    })
});
