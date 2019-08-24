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
    const dummyData = [
        {
          key: 1,
          title: "Rüebli Abo",
          hersteller: "Max Muster",
          preis: "25.00 Taler"
        },
        {
          key: 2,
          title: "Sunneschiin Früchte",
          hersteller: "Hans Muster",
          preis: "55.00 Taler"
        },
        {
          key: 3,
          title: "Blumen Mittel",
          hersteller: "Brigitte Muster",
          preis: "14.00 Taler"
        }
    ]
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(dummyData))
    return res;
});

app.post('/produkte', (req, res) => {
    console.log('Produkte Abfrage')
    const dummyData = [
        {
          key: 1,
          name: "Karotte",
          producer: "Max Muster",
          price: "2.00 Taler",
          co2Sparen: "15 g",
          imageURL: "https://www.gesundheit.de/sites/default/files/styles/crop_content/public/2016-03/karotte.jpg?itok=MrGiGvSb",
          onSale: false
        },
        {
        key: 2,
        name: "Kartoffel",
        producer: "Max Muster",
        price: "3.00 Taler",
        co2Sparen: "22 g",
        imageURL: "",
        onSale: true
        },
        {
        key: 3,
        name: "Bio-Ei",
        producer: "Herbert Meier",
        price: "1 Taler",
        co2Sparen: "9 g",
        imageURL: "",
        onSale: false
        }
      ]
    
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(dummyData))
    return res;
});

var server = app.listen(port, function () {
    var port = server.address().port;
    console.log("Express is working on port " + port);
});

