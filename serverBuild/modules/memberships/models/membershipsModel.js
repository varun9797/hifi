'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var database = require('../../utility/controller/queryConnection');
var cors = require('cors');
var jwt = require('jsonwebtoken');
process.env.SECRET_KEY = 'varunv';

var UserModel = function UserModel() {
    _classCallCheck(this, UserModel);

    this.executeQuery = function (req) {
        return new Promise(function (resolve, reject) {
            var appData = {
                'error': 1,
                'data': '',
                'status': '',
                'dbData': '',
                'fields': '',
                'satusCode': ''
            };
            var query = req.body.query;
            console.log('query is ' + query);
            database.connection.getConnection(function (err, connection) {
                if (err) {
                    console.log('got error!!', err);
                    reject(err);
                }
                connection.query(query, function (err, rows) {
                    connection.release();
                    if (!err) {
                        console.log('query executed successfully successfully ' + JSON.stringify(rows));
                        appData.error = 0;
                        appData['status'] = 'success!';
                        appData['satusCode'] = 201;
                        appData['dbData'] = rows;
                        resolve(appData);
                        //res.status(201).json(appData);
                    } else {
                        console.log('Query Exception ' + err);
                        appData['data'] = 'Error Occured!';
                        appData['satusCode'] = 400;
                        appData['err'] = err;
                        resolve(appData);
                        //res.status(400).json(err);
                    }
                });
            });
        });
    };

    this.registerUser = function (req, res) {
        return new Promise(function (resolve, reject) {
            var today = new Date();
            var appData = {
                'error': 1,
                'data': '',
                'satusCode': '',
                'dbResponse': ''
            };
            var userData = [req.body.email, req.body.first_name, req.body.last_name, req.body.password, req.body.phoneNumber];
            database.connection.getConnection(function (err, connection) {
                connection.query('insert into users(email,first_name,last_name,password, phonenumber) values ($1, $2, $3, $4, $5)', userData, function (err, rows, fields) {
                    connection.release();
                    if (!err) {
                        console.log('query is working fine ' + rows);
                        appData.error = 0;
                        appData['data'] = 'User registered successfully!';
                        appData['satusCode'] = rows;
                        appData['dbResponse'] = 201;
                        resolve(appData);
                        //res.status(201).json(appData);
                    } else {
                        console.log('got error ' + err);
                        appData['data'] = 'Error Occured!';
                        appData['satusCode'] = 400;
                        appData.error = err;
                        resolve(appData);
                        //res.status(400).json(err);
                    }
                });
            });
        });
    };

    this.loginUser = function (req, res) {
        return new Promise(function (resolve, reject) {
            var appData = {
                'error': 1,
                'data': '',
                'satusCode': ''
            };
            var email = req.body.email;
            var password = req.body.password;
            console.log('data is ' + JSON.stringify(req.body));
            database.connection.getConnection(function (err, connection) {
                connection.query('SELECT * FROM owner WHERE email = ?', [email], function (err, dbResponse, fields) {
                    connection.release();
                    if (err) {
                        console.log('error is ');
                        console.log(err);
                        appData.error = 1;
                        appData['data'] = 'Error Occured!';
                        appData['error'] = err;
                        appData['satusCode'] = 400;
                        resolve(appData);
                        //res.status(400).json(appData);
                    } else {
                        console.log('no error is ', JSON.stringify(dbResponse));
                        var rows = dbResponse;
                        console.log(rows);
                        if (rows.length > 0) {
                            console.log('rows.length is ');
                            if (rows[0].password == password) {
                                console.log('password match ');
                                console.log('rows[0] ' + JSON.stringify(rows[0]));
                                var token = jwt.sign(rows[0], process.env.SECRET_KEY, {
                                    expiresIn: 1440
                                });
                                appData.error = 0;
                                appData.isAdmin = rows[0].isadmin;
                                appData['token'] = token;
                                appData['satusCode'] = 200;
                                resolve(appData);
                                //res.status(200).json(appData);
                            } else {
                                console.log('password not match ');
                                appData.error = 1;
                                appData['data'] = 'Email and Password does not match';
                                appData['satusCode'] = 200;
                                reject(appData);
                                //res.status(204).json(appData);
                            }
                        } else {
                            console.log('else ');
                            appData.error = 1;
                            appData['data'] = 'Email does not exists!';
                            appData['satusCode'] = 404;
                            reject(appData);
                            //res.status(204).json(appData);
                        }
                    }
                });
            });
        });
    };

    this.getUser = function (req, res) {
        return new Promise(function (resolve, reject) {
            var appData = {};
            database.connection.getConnection(function (err, connection) {
                connection.query('SELECT * FROM owner', function (err, dbResponse, fields) {
                    connection.release();
                    if (!err) {
                        var rows = dbResponse;
                        appData['error'] = 0;
                        appData['data'] = rows;
                        appData['satusCode'] = 200;
                        resolve(appData);
                        //res.status(200).json(appData);
                    } else {
                        appData['data'] = 'No data found';
                        appData['satusCode'] = 200;
                        reject(appData);
                        //res.status(204).json(appData);
                    }
                });
            });
        });
    };
};

exports.default = UserModel;
//# sourceMappingURL=membershipsModel.js.map