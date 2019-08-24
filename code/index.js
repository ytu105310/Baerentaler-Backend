const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoDB = require('./mongo');

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendfile("view/index.html");
    console.log("Your logged in!");
});

app.post('/login', (req, res) => {
    res = mongoDB.findAllUsers(req, res);
    return res;
});

app.post('/abos', (req, res) => {
  res = mongoDB.findAllAbos(req, res);
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

