
// var pg = require('pg');
// var conString = "postgres://wsrrbjocaymlos:956d67da3f6a4ad9d4e26feb07c9513dde47284edb0a9cebe6c7e75fa36ad56c@ec2-54-83-27-165.compute-1.amazonaws.com:5432/dah42qg107lb3c";

// var connection = new pg.Client(conString);
// connection.connect();

var mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 3306,
    debug: false,
    multipleStatements: true
});


module.exports.connection = connection;