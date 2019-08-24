var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('bernHackt.db');


connect = function () {
    try {

        db.connect = (function () {
            /*
            db.run("CREATE TABLE lorem (info TEXT)");

            var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
            for (var i = 0; i < 10; i++) {
                stmt.run("Ipsum " + i);
            }
            stmt.finalize();

            db.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
                console.log(row.id + ": " + row.info);
            });
            */
        });
    } catch (e) {
        console.log(e);
    }
};


get = function () {
    console.log("here")
    try {
        var count = db.run("SELECT * FROM lorem");
        console.log(count)
    } catch (e) {
        console.log(e)
    }
};


module.exports.connect = connect;
module.exports.getFromDB = get;


