
// var pg = require('pg');
// var conString = "postgres://wsrrbjocaymlos:956d67da3f6a4ad9d4e26feb07c9513dde47284edb0a9cebe6c7e75fa36ad56c@ec2-54-83-27-165.compute-1.amazonaws.com:5432/dah42qg107lb3c";

// var connection = new pg.Client(conString);
// connection.connect();

var mysql = require('mysql');

var connection = mysql.createPool({
    connectionLimit: 100,
    host:'betterworld.cqdt99obscjn.us-east-1.rds.amazonaws.com',
    user:'verma9797',
    password:'qwer#123',
    database:'dev_society',
    port: 3306,
    debug: false,
    multipleStatements: true
});


module.exports.connection = connection;