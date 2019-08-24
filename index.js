const express = require('express');
const server = express();
const connect = require('./database');
const port = process.env.PORT || 8000;

server.get('/', (req, res) => {
    res.send('Login');
    connect.runDBFlow();
});

server.get('/Home', (req, res) => {
    res.send('Home!');
});

server.get('/Abos', (req, res) => {
    res.send('Abos');
});

server.get('/Produkte', (req, res) => {
    res.send('Produkte!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


