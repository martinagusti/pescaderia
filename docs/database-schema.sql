CREATE DATABASE IF NOT EXISTS pescaderia;
USE pescaderia;

DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS providers;
DROP TABLE IF EXISTS income;
DROP TABLE IF EXISTS pointsOfSale;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(200) NOT NULL,
password VARCHAR(128) NOT NULL,
date date NOT NULL
);

CREATE TABLE pointsofsale(
ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
address VARCHAR(150) NOT NULL,
postalCode INT unsigned NOT NULL,
city varchar(150) NOT NULL,
date date NOT NULL
);

CREATE TABLE providers(
ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
businessName varchar(150) NOT NULL,
cif varchar(100) NOT NULL,
address VARCHAR(150),
postalCode INT unsigned,
city varchar(150)
);

CREATE TABLE income(
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
idPointsOfSale INT UNSIGNED NOT NULL,
amount decimal NOT NULL,
type ENUM ("efectivo", "tarjeta", "transferencia") NOT NULL,
date DATE NOT NULL,
FOREIGN KEY(idPointsOfSale) REFERENCES pointsofsale(id)
ON DELETE CASCADE

);

CREATE TABLE expenses(
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
idPointsOfSale INT UNSIGNED NOT NULL,
idProvider INT UNSIGNED NOT NULL,
expenseDate DATE NOT NULL,
date DATE NOT NULL,
amount decimal NOT NULL,
status ENUM ("PAGADO", "NO PAGADO"),
paydate DATE NOT NULL,
FOREIGN KEY(idProvider) REFERENCES providers(id)
ON DELETE CASCADE,
FOREIGN KEY(idPointsOfSale) REFERENCES pointsofsale(id)
ON DELETE CASCADE
);


