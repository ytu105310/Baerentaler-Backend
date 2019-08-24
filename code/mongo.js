var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('bernHackt', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'bernHackt' database");
        db.collection('benutzer', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'benutzer' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

/* exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving wine: ' + id);
    db.collection('wines', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
}; */

findAll = function(req, res) {
    db.collection('benutzer', function(err, collection) {
        collection.find({}).toArray(function(err, items) {
            res.send(items);
        });
    });
};
/* 
exports.addWine = function(req, res) {
    var wine = req.body;
    console.log('Adding wine: ' + JSON.stringify(wine));
    db.collection('wines', function(err, collection) {
        collection.insert(wine, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateWine = function(req, res) {
    var id = req.params.id;
    var wine = req.body;
    console.log('Updating wine: ' + id);
    console.log(JSON.stringify(wine));
    db.collection('wines', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, wine, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(wine);
            }
        });
    });
}

exports.deleteWine = function(req, res) {
    var id = req.params.id;
    console.log('Deleting wine: ' + id);
    db.collection('wines', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
} */

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var benutzer = [
    {
        vorname: "Max",
        nachname: "Muster",
        geburtsDatum: "02.02.2001",
        saldo: 77
    },
    {
        vorname: "Brigitte",
        nachname: "Suter",
        geburtsDatum: "15.03.1975",
        saldo: 103
    }];

    db.collection('benutzer', function(err, collection) {
        collection.insert(benutzer, {safe:true}, function(err, result) {});
    });

};

module.exports.findAll = findAll;