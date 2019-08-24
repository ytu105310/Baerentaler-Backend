const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const connect = require('./database');

let server = require('http').Server(app);

app.get('/', (req, res) => {
    res.send('Login');
    connect.runDBFlow();
});

app.get('/Home', (req, res) => {
    res.send('Home!');
    connect.getFromDB()
});

app.get('/Abos', (req, res) => {
    res.send('Abos');
});

app.get('/Abo/Hersteller/Produkte', (req, res) => {
    res.send('Produkte!');
});

connect.connect();
connect.getFromDB();
server.listen(port, () => {
    console.log("App is running on port " + port);
});
