CREATE DATABASE IF NOT EXISTS pescaderia;
USE pescaderia;

DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS PROVIDERS;
DROP TABLE IF EXISTS INCOME;
DROP TABLE IF EXISTS pointsOfSale;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(200) NOT NULL,
password VARCHAR(128) NOT NULL,
date date NOT NULL
);

CREATE TABLE pointsOfSale(
ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
address VARCHAR(150) NOT NULL,
postalCode INT unsigned NOT NULL,
city varchar(150) NOT NULL,
DATE DATE NOT NULL
);

CREATE TABLE PROVIDERS(
ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
businessName varchar(150) NOT NULL,
cif varchar(100) NOT NULL,
address VARCHAR(150),
postalCode INT unsigned,
city varchar(150)
);

CREATE TABLE INCOME(
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
idPointsOfSale INT UNSIGNED NOT NULL,
amount decimal NOT NULL,
type ENUM ("efectivo", "tarjeta", "transferencia") NOT NULL,
date DATE NOT NULL,
FOREIGN KEY(IdpointsOfSale) REFERENCES pointsOfSale(id)
ON DELETE CASCADE

);

CREATE TABLE expenses(
ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
IdpointsOfSale INT UNSIGNED NOT NULL,
idProvider INT UNSIGNED NOT NULL,
expenseDate DATE NOT NULL,
DATE DATE NOT NULL,
amount decimal NOT NULL,
STATUS ENUM ("PAGADO", "NO PAGADO"),
paydate DATE NOT NULL,
FOREIGN KEY(idProvider) REFERENCES PROVIDERS(id)
ON DELETE CASCADE,
FOREIGN KEY(IdpointsOfSale) REFERENCES pointsOfSale(id)
ON DELETE CASCADE
);

