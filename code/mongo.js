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

        db.collection('carbonSavings', { strict: true }, function (err, collection) {
            if (err) {
                console.log("The 'carbonSavings' collection doesn't exist. Creating it with sample data...");
                generateCarbonSavings();
            }
        });
    }
});


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

findCarbonSavings = function (req, res) {
    db.collection('carbonSavings', function (err, collection) {
        collection.find({}).toArray(function (err, items) {
            res.send(items);
        });
    });
};

findProductsByProducerId = function (req, res, producerId) {
    db.collection('products', function (err, collection) {
        collection.find({producerId: producerId}).toArray(function (err, items) {
            res.send(items);
        });
    });
}

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
        price: '1BT pro Stück',
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
        producerId: '01',
        producer: 'Max Knecht, Emmental',
        price: '5BT pro kg',
        imageUrl: 'https://www.gesundheit.de/sites/default/files/styles/crop_content/public/2016-03/karotte.jpg?itok=MrGiGvSb'
    },
    {
        name: 'Eier',
        producerId: '02',
        producer: 'Miriam Schmid, Bern',
        price: '1BT pro Stück',
        imageUrl: 'https://img.utopia.de/dMHQXBCqXgwwiHdDAers9jDua_0=/640x300/https://utopia.de/app/uploads/2019/03/eier-kaufberatung-wsiraphol1603181280x720.jpg'
    },
    {
        name: 'Olivenöl',
        producerId: '02',
        producer: 'Miriam Schmid, Bern',
        price: '17BT pro Liter',
        imageUrl: 'https://www.reisewort.de/wp-content/uploads/2017/08/Olivenöl-aus-Kroatien-1024x683.jpg'
    },

    {
        name: 'Fenchel',
        producerId: '02',
        producer: 'Miriam Schmid, Bern',
        price: '4BT pro Stück',
        imageUrl: 'https://www.gutekueche.at/img/artikel/1182/fenchelknolle.jpg'
    },
    {
        name: 'Nüsslisalat',
        producerId: '01',
        producer: 'Max Knecht, Emmental',
        price: '3BT pro 100g',
        imageUrl: 'https://www.bauernzeitung.ch/media/14460/csm_3396_nuessler_pd_059d41fe4e.jpg?anchor=center&mode=crop&width=750&height=420&rnd=132013713070000000'
    },
    {
        name: 'Bauernbrot',
        producerId: '03',
        producer: 'John Doe, Wohlen',
        price: '4BT pro Stück',
        imageUrl: 'https://www.kochenundkueche.com/sites/default/files/styles/medium/public/redaktionsrezept_images/backprofi_buschenschank-brot-aufgeschnitten-web.jpg?itok=qitmNXqG'
    },
    {
        name: 'Baguette',
        producerId: '03',
        producer: 'John Doe, Wohlen',
        price: '3BT pro Stück',
        imageUrl: 'https://www.daskochrezept.de/sites/default/files/styles/169_xl/public/2017-10/istock-157567837.jpg?h=17ee2a09&itok=aqagA4kw'
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

var generateCarbonSavings = function () {
    var carbonSavings = [
        {
            month: 'march',
            savings: 4,
        },
        {
            month: 'april',
            savings: 3,
        },
        {
            month: 'may',
            savings: 5,
        },
        {
            month: 'june',
            savings: 6,
        },
        {
            month: 'july',
            savings: 5,
        },
        {
            month: 'august',
            savings: 7,
        },
    ];
    db.collection('carbonSavings', function (err, collection) {
        collection.insert(carbonSavings, { safe: true }, function (err, result) { });
    });
};

module.exports.findAllUsers = findAllUsers;
module.exports.findAllAbos = findAllAbos;
module.exports.findAllProducts = findAllProducts;
module.exports.findAllTransactions = findAllTransactions;
module.exports.findCarbonSavings = findCarbonSavings;
module.exports.findProductsByProducerId = findProductsByProducerId;