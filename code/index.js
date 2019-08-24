const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const connect = require('./database');

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendfile("view/index.html");
    console.log("Your logged in!");
});

app.post('/login', (req, res) => {
    console.log(req.body.fname);
    res.redirect('/home')
});

app.get('/home', (req, res) => {
    console.log(req.body.abos)
    res.sendfile("view/home.html");
});

app.get('/abos', (req, res) => {
    res.sendfile("viewl/abos.html");
});

app.post('/abos', (req, res) => {
    console.log('Abo page');
    //res.redirect('/abos')
    const dummyData = [
        {
            id: 1,
            title: "Rüebli Abo",
            hersteller: "Max Muster",
            preis: "25.00 Taler"
        },
        {
            id: 2,
            title: "Sunneschiin Früchte",
            hersteller: "Hans Muster",
            preis: "55.00 Taler"
        },
        {
            id: 3,
            title: "Blumen Mittel",
            hersteller: "Grigitte Muster",
            preis: "14.00 Taler"
        }
    ];

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(dummyData))
    console.log(res);
    return res;
});

var server = app.listen(port, function () {
    var port = server.address().port;
    console.log("Express is working on port " + port);
});

