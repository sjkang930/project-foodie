create database foodgram;
use foodgram;

CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTO_INCREMENT, 
    comment VARCHAR(255),
    `timestamp` TIMESTAMP DEFAULT NOW()
);
