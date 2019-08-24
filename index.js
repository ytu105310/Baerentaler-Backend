const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const connect = require('./database');

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendfile("index.html");
    console.log("Your logged in!")
});

app.post('/login', (req, res) => {
    console.log(req.body.fname)
    res.redirect('/home')
});

app.get('/home', (req, res) => {
    console.log(req.body.abos)
    res.sendfile("home.html");
});

app.get('/abos', (req, res) => {
    res.sendfile("abos.html");
});

app.post('/abos', (req, res) => {
    console.log('Abo page')
    res.redirect('/abos')
});

var server = app.listen(port, function () {
    var port = server.address().port;
    console.log("Express is working on port " + port);
});

