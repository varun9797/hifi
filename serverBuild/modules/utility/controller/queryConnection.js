'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var database = require('./../../../../database/database');

var QueryMediator = function QueryMediator() {
    _classCallCheck(this, QueryMediator);

    this.queryConnection = function (query) {
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        var appData = {
            'error': 1,
            'data': '',
            'satusCode': '',
            'dbResponse': ''
        };
        return new Promise(function (resolve, reject) {
            database.connection.getConnection(function (err, connection) {
                if (err) {
                    console.log('got error ' + err);
                    appData.error = err;
                    appData['data'] = 'Error Occured!';
                    appData['satusCode'] = 500;
                    appData['dbResponse'] = '';
                    reject(appData);
                } else {
                    connection.query(query, [value], function (err, rows) {
                        //console.log(temp.sql);
                        connection.release();
                        if (!err) {
                            appData.error = 0;
                            appData['data'] = '';
                            appData['satusCode'] = 201;
                            appData['dbResponse'] = rows;
                            resolve(appData);
                            //res.status(201).json(appData);
                        } else {
                            appData.error = err;
                            appData['data'] = 'Error Occured!';
                            appData['satusCode'] = 400;
                            appData['dbResponse'] = '';
                            reject(appData);
                            //res.status(400).json(err);
                        }
                    });
                }
            });
            // connection.query(query, value, function (err, rows) {
            //     connection.release();
            //     if (!err) {
            //         console.log('Ok ');
            //         appData.error = 0;
            //         appData['data'] = 'User registered successfully!';
            //         appData['dbResponse'] = rows;
            //         appData['satusCode'] = 201;
            //         resolve(appData);
            //     } else {
            //         console.log('got error ' + err);
            //         appData['data'] = 'Error Occured!';
            //         appData['satusCode'] = 400;
            //         appData.error = err;
            //         reject(appData);
            //     }
            // });
        });
    };
};

exports.default = QueryMediator;
//# sourceMappingURL=queryConnection.js.map