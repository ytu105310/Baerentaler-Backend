const express = require('express');
const app = express();
const port = 3000;
const connect = require('./database');

app.get('/', (req, res) => {
    res.send('Hello World!');
    connect.runDBFlow();
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
