DROP DATABASE IF EXISTS fuelproject;
CREATE DATABASE fuelproject;

DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS profileInfo CASCADE;
DROP TABLE IF EXISTS fuelquote CASCADE;

CREATE TABLE Users(
    user_name varchar(255) PRIMARY KEY,
    password char(255),
    email varchar(255)
);

CREATE TABLE profileInfo(
    user_name varchar(255) PRIMARY KEY,
    full_name varchar(255),
    address1 char(255),
    address2 char(255),
    city char(255),
    state char(255),
    zip int
);

CREATE TABLE fuelquote(
    Gallons_Requested numeric(10,2) NOT NULL,
	Delivery_Address char(255),
	Delivery_Date timestamp ,
	Suggested_Price numeric(10,2),
	Total_Amount numeric(10,2)
);

INSERT INTO Users VALUES ('Moderna','cosc','cosc4354@gmail.com');
INSERT INTO Users VALUES ('Pfizer','cosc','cosc4353@gmail.com');

INSERT INTO profileinfo VALUES ('Moderna','Chad Raymor','6377 Instabull Dr',' ', 'Spring', 'TX', '77053');
INSERT INTO profileinfo VALUES ('Pfizer','Loc Nguyen','6378 Mocha Ln',' ', 'Katy', 'TX', '77056');