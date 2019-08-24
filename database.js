let sqlite3 = require('sqlite3').verbose();
let query = require('./SQL/createAllTables');

function createDb() {
    console.log("Create DB");
    db = new sqlite3.Database('bernHackt.sqlite3', dropAllTables);
}

function dropAllTables() {
    console.log("Drop tables");
    db.run(query.dropAllTables, createTables);
}

function createTables() {
    console.log("Create all tables");
    db.run(query.createAllTables, insertDummyData);
}

function insertDummyData() {
    console.log("Insert data");
    let stmt = db.prepare("INSERT INTO Benutzer VALUES (?,?,?,?,?)");
    //stmt.run(1, "Max", "Muster", '2007-01-01 10:00:00', 0);
    stmt.finalize(readAllRows);
}

function readAllRows() {
    console.log("Read Benutzer table");
    db.all("SELECT * FROM Benutzer", function (err, rows) {
        rows.forEach(function (row) {
            console.log(row.vorname);
        })
    });
    closeDb();
}

function closeDb() {
    console.log("closeDb");
    db.close();
}

function runDBFlow() {
    createDb();
}

module.exports.runDBFlow = runDBFlow;


