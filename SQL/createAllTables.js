module.exports = Object.freeze({
    createAllTables: 
    `CREATE TABLE Benutzer (
    benutzer_id INTEGER PRIMARY KEY,
    vorname TEXT NOT NULL,
    nachname TEXT NOT NULL,
    geburtsdatum DATE NOT NULL,
    anzahlTaler INTEGER DEFAULT 0 NOT NULL
    );

    CREATE TABLE Einheit (
    einheit_id INTEGER PRIMARY KEY,
    einheitsname TEXT NOT NULL,
    abkuerzung TEXT
    );

    CREATE TABLE Produkt (
    produkt_id INTEGER PRIMARY KEY,
    produktname TEXT NOT NULL,
    menge INTEGER NOT NULL,
    einheit_id INTEGER NOT NULL,
    preis INTEGER NOT NULL,
    co2ersparnis INTEGER,
    schwelleGesucht INTEGER NOT NULL,
    gesucht boolean NOT NULL,
    geboten boolean NOT NULL,
    sale boolean NOT NULL,
    FOREIGN KEY (einheit_id) REFERENCES Einheit (einheit_id) 
    ON DELETE CASCADE ON UPDATE NO ACTION
    );

    CREATE TABLE Hersteller (
    hersteller_id INTEGER PRIMARY KEY,
    benutzer_id INTEGER NOT NULL,
    hersteller_produkt_id INTEGER NOT NULL,
    bewertung INTEGER,
    FOREIGN KEY (benutzer_id) REFERENCES Benutzer (benutzer_id) 
    ON DELETE CASCADE ON UPDATE NO ACTION
    );
    
    CREATE TABLE Hersteller_Produkt (
    hersteller_id integer,
    produkt_id integer,
    PRIMARY KEY (hersteller_id, produkt_id),
    FOREIGN KEY (hersteller_id) REFERENCES Hersteller (hersteller_id) 
    ON DELETE CASCADE ON UPDATE NO ACTION,
    FOREIGN KEY (produkt_id) REFERENCES Produkt (produkt_id) 
    ON DELETE CASCADE ON UPDATE NO ACTION
    );
    
    CREATE TABLE Abo (
    abo_id INTEGER PRIMARY KEY,
    hersteller_id INTEGER NOT NULL,
    abo_produkt_id INTEGER NOT NULL,
    FOREIGN KEY (hersteller_id) REFERENCES Hersteller (hersteller_id) 
    ON DELETE CASCADE ON UPDATE NO ACTION
    );

    CREATE TABLE Abo_Produkt (
    abo_id integer,
    produkt_id integer,
    PRIMARY KEY (abo_id, produkt_id),
    FOREIGN KEY (abo_id) REFERENCES Abo (abo_id) 
    ON DELETE CASCADE ON UPDATE NO ACTION,
    FOREIGN KEY (produkt_id) REFERENCES Produkt (produkt_id) 
    ON DELETE CASCADE ON UPDATE NO ACTION
    );

    CREATE TABLE Kunde (
    kunde_id INTEGER PRIMARY KEY,
    benutzer_id INTEGER NOT NULL,
    kunde_abo_id INTEGER,
    FOREIGN KEY (benutzer_id) REFERENCES Benutzer (benutzer_id) 
    ON DELETE CASCADE ON UPDATE NO ACTION
    );

    CREATE TABLE Kunde_Abo (
    kunde_id integer,
    abo_id integer,
    PRIMARY KEY (kunde_id, abo_id),
    FOREIGN KEY (kunde_id) REFERENCES Kunde (kunde_id) 
    ON DELETE CASCADE ON UPDATE NO ACTION,
    FOREIGN KEY (abo_id) REFERENCES Abo (abo_id) 
    ON DELETE CASCADE ON UPDATE NO ACTION
    );`,
    
    dropAllTables: 
    `DROP TABLE Kunde_Abo;
    DROP TABLE Kunde;
    DROP TABLE Abo_Produkt;
    DROP TABLE Abo;
    DROP TABLE Hersteller_Produkt;
    DROP TABLE Hersteller;
    DROP TABLE Produkt;
    DROP TABLE Einheit;
    DROP TABLE Benutzer;`
});