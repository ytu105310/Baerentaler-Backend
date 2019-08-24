const express = require('express');
const app = express();
const port = 3000;
const connect = require('./database');

app.get('/', (req, res) => {
    res.send('Login');
    connect.getFromDB()
});

app.get('/Home', (req, res) => {
    res.send('Home!');
});

app.get('/Abos', (req, res) => {
    res.send('Abos');
});

app.get('/Produkte', (req, res) => {
    res.send('Produkte!');
});

connect.connect();
connect.getFromDB();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
