var mocha = require('mocha');
var expect = require('chai').expect;
var request = require('supertest');
var app = require('../server');

var environment = process.env.NODE_ENV;
var config = require('../knexfile.js');
var knex = require('knex')(config['test'])


describe('get / route', function() {
  it('should go / route', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
});
