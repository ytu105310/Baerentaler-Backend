const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoDB = require('./mongo');

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Connection works!'));

app.post('/login', (req, res) => {
    res = mongoDB.findAllUsers(req, res);
    return res;
});

app.post('/abos', (req, res) => {
  res = mongoDB.findAllAbos(req, res);
  return res;
});

app.post('/products', (req, res) => {
  res = mongoDB.findAllProducts(req, res);
  return res;
});

var server = app.listen(port, function () {
    var port = server.address().port;
    console.log("Express is working on port " + port);
});

