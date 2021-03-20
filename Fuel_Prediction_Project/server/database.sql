CREATE DATABASE fuelproject;

CREATE TABLE User(
    user_name varchar(255) PRIMARY KEY,
    password char(255),
    email varchar(255)
);

INSERT INTO User (
    user_name,
    password,
    email)
VALUES ('group18','cosc','cosc4354@gmail.com');
