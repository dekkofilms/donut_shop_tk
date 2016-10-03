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

describe('goes to home route and returns list of shops', function() {
  it('should go home page and list shops', function(done) {
    request(app).get('/shops')
      .expect(200)
      .end(function (err, res) {
        knex('shops').then(function (data) {
          expect(res.text).to.include(data[0].name);
          expect(res.text).to.include(data[1].name);
          expect(res.text).to.include(data[2].name);
          done();
        })
      });
  });
});

describe('should go shop show page and show individual shop page by id', function() {
  it('should go shop show page 1', function(done) {
    request(app).get('/shops/1')
      .expect(200)
      .end(function (err, res) {
        knex('shops').where('id', 1).first().then(function (data) {
          expect(res.text).to.include(data.name);
          expect(res.text).to.include(data.city);
          expect(res.text).to.include(data.id);
          done();
        })
      });
  });

  it('should go shop show page 2', function(done) {
    request(app).get('/shops/2')
      .expect(200)
      .end(function (err, res) {
        knex('shops').where('id', 2).first().then(function (data) {
          expect(res.text).to.include(data.name);
          expect(res.text).to.include(data.city);
          expect(res.text).to.include(data.id);
          done();
        })
      });
  });

  it('should go shop show page 3', function(done) {
    request(app).get('/shops/3')
      .expect(200)
      .end(function (err, res) {
        knex('shops').where('id', 3).first().then(function (data) {
          expect(res.text).to.include(data.name);
          expect(res.text).to.include(data.city);
          expect(res.text).to.include(data.id);
          done();
        })
      });
  });
});

describe('should go shop show page edit for each shop', function() {
  it('should go shop show page 1 and have form editable for the shop', function(done) {
    request(app).get('/shops/2/edit')
      .expect(200)
      .end(function (err, res) {
        knex('shops').where('id', 2).first().then(function (data) {
          expect(res.text).to.include('<form method="POST" action="/shops/2?_method=PUT">')
          expect(res.text).to.include(data.name);
          expect(res.text).to.include(data.city);
          done();
        })
      });
  });
});

describe('should go shop show page edit for each shop', function() {
  it('should go shop show page 1 and have form editable for the shop', function(done) {
    request(app).post('/shops/2?_method=PUT')
      .send({name: 'Joey is smart World!', city: 'Austinn'})
      .expect(200)
      .end(function (err, res) {
        request(app).get('/shops/2')
          .end(function (err, res) {
            expect(res.text).to.include('Joey is smart World!');
            done();
          })
      });
  });
});

describe('should go to shop new page', function() {
  it('should go shop to shop new page', function(done) {
    request(app).get('/shops/new')
      .expect(200)
      .end(function (err, res) {
        expect(res.text).to.include('<form method="POST" action="/shops/create">');
        done();
      });
  });
});

describe('should go post a new shop to the page', function() {

  after(function (done) {
    knex('shops').where('name', 'Tims World').del().then(function () {
      done();
    })
  })

  it('should go post a new shop to the page', function(done) {
    request(app).post('/shops/create')
      .send({name: 'Tims World', city: 'Bastrop'})
      .expect(200)
      .end(function (err, res) {
        request(app).get('/shops')
          .end(function (err, res) {
            expect(res.text).to.include('Tims World');
            done();
          });
      });
  });
});

describe('should delete a shop from the database', function() {

  before(function (done) {
    knex('shops').insert({id: 4, name: 'blah', city: 'blah city'}).then(function () {
      done();
    })
  })

  it('should delete a shop from the database', function(done) {
    request(app).post('/shops/destroy?_method=DELETE')
      .send({id: 4})
      .expect(200)
      .end(function (err, res) {
        knex('shops').then(function (data) {
          expect(data.length).to.equal(3);
          done();
        })
      });
  });
});

describe('should go to the employees of the shop page', function() {
  it('should go to the employees of the shop page', function(done) {
    request(app).get('/shops/1/employees')
      .expect(200)
      .end(function (err, res) {
        expect(res.text).to.include('timothy chewdinger');
        done();
      });
  });
});

describe('should go to the employees individual page', function() {
  it('should go to the employees individual page', function(done) {
    request(app).get('/shops/1/employees/4')
      .expect(200)
      .end(function (err, res) {
        expect(res.text).to.include('<h1>timothy chewdinger</h1>');
        done();
      });
  });
});

describe('should go to a form to edit the employee', function() {
  it('should go to a form to edit the employee', function(done) {
    request(app).get('/shops/1/employees/4/edit')
      .expect(200)
      .end(function (err, res) {
        expect(res.text).to.include('<form method="POST" action="/shops/1/employees/4?_method=PUT">');
        done();
      });
  });
});

describe('should update the employee info on submission', function() {
  it('should update the employee info on submission', function(done) {
    request(app).post('/shops/1/employees/4?_method=PUT')
      .send({first_name: 'timothy', last_name: 'chewdinger', shop_id: 1, favorite_donut: 1})
      .expect(200)
      .end(function (err, res) {
        request(app).get('/shops/1/employees/4')
          .end(function (err, res) {
            expect(res.text).to.include('<h1>timothy chewdinger</h1>');
            done();
          })
      });
  });
});

describe('should go to a form to create a new employee for that specific shop page', function() {
  it('should go to a form to create a new employee for that specific shop page', function(done) {
    request(app).get('/shops/1/employees/new')
      .expect(200)
      .end(function (err, res) {
        expect(res.text).to.include('<form method="POST" action="/shops/1/employees">');
        done();
      });
  });
});

describe('should post a new employee for that shop', function() {

  after(function (done) {
    knex('employees').where('first_name', 'timorgus').del().then(function () {
      done();
    })
  })

  it('should post a new employee for that shop', function(done) {
    request(app).post('/shops/1/employees')
      .send({first_name: 'timorgus', last_name: 'chewferston', shop_id: 3, favorite_donut: 1})
      .expect(200)
      .end(function (err, res) {
        request(app).get('/shops/3/employees')
          .end(function (err, res) {
            expect(res.text).to.include('timorgus');
            done();
          });
      });
  });
});

describe('should delete an employee from the employee database', function() {

  before(function (done) {
    knex('employees').insert({id: 101, first_name: 'samdinger', last_name: 'spellermanchan', shop_id: 2, favorite_donut: 2}).then(function () {
      done();
    })
  })

  it('should delete an employee from the employee database', function(done) {
    request(app).post('/shops/2/employees?_method=DELETE')
      .send({id: 101})
      .expect(200)
      .end(function (err, res) {
        knex('employees').then(function (data) {
          expect(data.length).to.equal(3);
          done();
        })
      });
  });
});
