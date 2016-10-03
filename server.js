var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var environment = process.env.NODE_ENV;
var config = require('./knexfile.js')[environment];
var knex = require('knex')(config);

app.get('/', function (req, res) {
  res.send('booyah!')
});

app.listen(port, function () {
  console.log('server listening!');
});

module.exports = app;
