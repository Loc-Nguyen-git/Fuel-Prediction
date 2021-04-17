DROP DATABASE IF EXISTS fuelproject;
CREATE DATABASE fuelproject;

DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS profileInfo CASCADE;
DROP TABLE IF EXISTS fuelquote CASCADE;

CREATE TABLE Users(
    user_name varchar(255) PRIMARY KEY,
    password varchar(255)
);

CREATE TABLE profileInfo(
    user_name varchar(255) PRIMARY KEY,
    full_name varchar(50),
    address1 varchar(100),
    address2 varchar(100),
    city varchar(100), 
    state varchar(2),
    zip varchar(9)
);

CREATE TABLE fuelquote(
    no_quote SERIAL PRIMARY KEY,
    user_name varchar(255),
    Gallons_Requested numeric(100000,3),
	Delivery_Address char(255),
	Delivery_Date timestamp ,
	Suggested_Price numeric(10,3),
	Total_Amount numeric(100000,3)
);

/*INSERT INTO Users VALUES ('Moderna','cosc','cosc4354@gmail.com');
INSERT INTO Users VALUES ('Pfizer','cosc','cosc4353@gmail.com');

INSERT INTO profileinfo VALUES ('Moderna','Chad Raymor','6377 Instabull Dr',' ', 'Spring', 'TX', '77053');
INSERT INTO profileinfo VALUES ('Pfizer','Loc Nguyen','6378 Mocha Ln',' ', 'Katy', 'TX', '77056');*/