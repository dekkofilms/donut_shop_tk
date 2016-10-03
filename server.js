var express          = require('express');
var app              = express();
var port             = process.env.PORT || 3000;
var environment      = process.env.NODE_ENV;

var config           = require('./knexfile.js')[environment];
var knex             = require('knex')(config);

var methodOverride   = require('method-override');
var ejs              = require('ejs');
var bodyParser       = require('body-parser');


//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//method override middleware
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.send('hi');
});

app.get('/shops', function (req, res) {
  knex('shops').then(function (data) {
    res.render('shop/index', {shops: data})
  });
});

app.post('/shops/create', function (req, res) {
  knex('shops').insert(req.body).then(function () {
    res.redirect('/shops');
  });
});

app.delete('/shops/destroy', function (req, res) {
  knex('shops').where(req.body).del().then(function () {
    res.redirect('/shops');
  });
});

app.get('/shops/new', function (req, res) {
  res.render('shop/new.ejs');
});

app.get('/shops/:shop_id', function (req, res) {
  var shopID = req.params.shop_id;
  knex('shops').where('id', shopID).first().then(function (basicinfo) {
    knex('employees').where('shop_id', shopID).then(function (employees) {
      console.log(shopID);
      console.log(employees);
      res.render('shop/showpage.ejs', {shop: basicinfo, employees: employees});
    });
  });
});

app.get('/shops/:shop_id/edit', function (req, res) {
  var shopID = req.params.shop_id;
  knex('shops').where('id', shopID).first().then(function (data) {
    res.render('shop/edit.ejs', {shop: data});
  });
});

app.put('/shops/:shop_id', function (req, res) {
  var shopID = req.params.shop_id;
  knex('shops').where('id', shopID).update({name: req.body.name, city: req.body.city}).then(function (data) {
    res.redirect('/shops/' + shopID);
  });
});

app.delete('/shops/:shop_id/employees', function (req, res) {
  var shopID = req.params.shop_id;
  knex('employees').where(req.body).del().then(function () {
    res.redirect('/shops/' + shopID + '/employees');
  });
});

app.get('/shops/:shop_id/employees', function (req, res) {
  var shopID = req.params.shop_id;
  knex('employees').where('shop_id', shopID).then(function (data) {
    res.render('shop/employees.ejs', {employees: data});
  });
});

app.post('/shops/:shop_id/employees', function (req, res) {
  var shopID = req.params.shop_id;
  knex('employees').insert(req.body).then(function () {
    res.redirect('/shops/' + shopID + '/employees');
  });
});


app.get('/shops/:shop_id/employees/new', function (req, res) {
  var shopID = req.params.shop_id;
  res.render('shop/employee_new.ejs', {shopID: shopID});
});

app.get('/shops/:shop_id/employees/:employee_id', function (req, res) {
  var shopID = req.params.shop_id;
  var employeeID = req.params.employee_id;
  knex('employees').where('id', employeeID).first().then(function (data) {
    res.render('shop/employee_page.ejs', {employee: data});
  });
});

app.get('/shops/:shop_id/employees/:employee_id/edit', function (req, res) {
  var shopID = req.params.shop_id;
  var employeeID = req.params.employee_id;
  knex('employees').where('id', employeeID).first().then(function (data) {
    res.render('shop/employee_edit.ejs', {employee: data});
  });
});

app.put('/shops/:shop_id/employees/:employee_id', function (req, res) {
  var shopID = req.params.shop_id;
  var employeeID = req.params.employee_id;
  knex('employees').where('id', employeeID).update(req.body).then(function (data) {
    res.redirect('/shops/' + shopID + '/employees/' + employeeID);
  });
});

app.listen(port, function () {
  console.log('server listening!');
});

module.exports = app;
