const express = require('express');
const app = express();
const port = 3000;
const connect = require('./database');

app.get('/', (req, res) => {
    res.send('Hello World!');
    connect.getFromDB()
});

connect.connect();
connect.getFromDB();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
