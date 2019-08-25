var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db;

var server = new Server('localhost', 27017, { auto_reconnect: true });
db = new Db('bernHackt', server);

db.open(function (err, db) {
    if (!err) {
        console.log("Connected to 'bernHackt' database");
        db.collection('benutzer', { strict: true }, function (err, collection) {
            if (err) {
                console.log("The 'benutzer' collection doesn't exist. Creating it with sample data...");
                generateUsers();
            }
        });

        db.collection('abos', { strict: true }, function (err, collection) {
            if (err) {
                console.log("The 'abos' collection doesn't exist. Creating it with sample data...");
                generateAbos();
            }
        });

        db.collection('products', { strict: true }, function (err, collection) {
            if (err) {
                console.log("The 'products' collection doesn't exist. Creating it with sample data...");
                generateProducts();
            }
        });

        db.collection('transactions', { strict: true }, function (err, collection) {
            if (err) {
                console.log("The 'transactions' collection doesn't exist. Creating it with sample data...");
                generateTransactions();
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

findAllUsers = function (req, res) {
    db.collection('benutzer', function (err, collection) {
        collection.find({}).toArray(function (err, items) {
            res.send(items);
        });
    });
};

findAllAbos = function (req, res) {
    db.collection('abos', function (err, collection) {
        collection.find({}).toArray(function (err, items) {
            res.send(items);
        });
    });
};

findAllProducts = function (req, res) {
    db.collection('products', function (err, collection) {
        collection.find({}).toArray(function (err, items) {
            res.send(items);
        });
    });
};

findAllTransactions = function (req, res) {
    db.collection('transactions', function (err, collection) {
        collection.find({}).toArray(function (err, items) {
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
var generateUsers = function () {

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

    db.collection('benutzer', function (err, collection) {
        collection.insert(benutzer, { safe: true }, function (err, result) { });
    });
};

var generateAbos = function () {
    var abos = [{
        name: 'Karotten',
        producer: 'Max Knecht, Emmental',
        price: '5BT pro kg',
        everyXthWeek: '2',
        amount: '200g',
    },
    {
        name: 'Eier',
        producer: 'Miriam Schmid, Bern',
        price: '2BT for 2',
        everyXthWeek: '2',
        amount: '20g',
    },
    {
        name: 'Brot',
        producer: 'John Doe, Wohlen',
        price: '3BT pro kg',
        everyXthWeek: '1',
        amount: '145g',
    }];

    db.collection('abos', function (err, collection) {
        collection.insert(abos, { safe: true }, function (err, result) { });
    });
};

var generateProducts = function () {
    var products = [{
        name: 'Karotten',
        producer: 'Max Knecht, Emmental',
        price: '5BT pro kg',
        imageUrl: 'https://www.gesundheit.de/sites/default/files/styles/crop_content/public/2016-03/karotte.jpg?itok=MrGiGvSb'
    },
    {
        name: 'Eier',
        producer: 'Miriam Schmid, Bern',
        price: '2BT for 2',
        imageUrl: 'https://img.utopia.de/dMHQXBCqXgwwiHdDAers9jDua_0=/640x300/https://utopia.de/app/uploads/2019/03/eier-kaufberatung-wsiraphol1603181280x720.jpg'
    },
    {
        name: 'Brot',
        producer: 'John Doe, Wohlen',
        price: '3BT pro kg',
        imageUrl: 'https://www.kochenundkueche.com/sites/default/files/styles/medium/public/redaktionsrezept_images/backprofi_buschenschank-brot-aufgeschnitten-web.jpg?itok=qitmNXqG'
    }];

    db.collection('products', function (err, collection) {
        collection.insert(products, { safe: true }, function (err, result) { });
    });
};

var generateTransactions = function () {
    var transactions = [
        {
            title: 'August', data: [{
                name: 'Orangenblütenhonig',
                producer: 'Lia Klein',
                balanceDifference: -8,
                date: '24.08.2019',
            }, {
                name: 'Karotten',
                producer: 'Lukas Dreitzger',
                balanceDifference: -11,
                date: '16.08.2019',
            }, {
                name: 'Erdnüsse',
                producer: 'Adam Jost',
                balanceDifference: -4,
                date: '02.08.2019',
            }]
        },
        {
            title: 'Juli', data: [{
                name: 'Aprikosen',
                producer: 'Maximilian Buchs',
                balanceDifference: -16,
                date: '28.07.2019',
            }, {
                name: 'Tomaten',
                producer: 'Lorenzo Kaiser',
                balanceDifference: -5,
                date: '06.07.2019',
            }, {
                name: 'Heidelbeeren',
                producer: 'Moritz Hilton',
                balanceDifference: -6,
                date: '05.07.2019',
            }]
        },
    ];

    db.collection('transactions', function (err, collection) {
        collection.insert(transactions, { safe: true }, function (err, result) { });
    });
};

module.exports.findAllUsers = findAllUsers;
module.exports.findAllAbos = findAllAbos;
module.exports.findAllProducts = findAllProducts;
module.exports.findAllTransactions = findAllTransactions;