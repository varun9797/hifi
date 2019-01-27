var database = require('./../../database/database');

class QueryMediator {

    queryConnection = (query, value = null) => {
        var appData = {
            'error': 1,
            'data': '',
            'satusCode': '',
            'dbResponse': ''
        };
        return new Promise((resolve, reject) => {
            database.connection.getConnection((err, connection) => {
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
    }

}

export default QueryMediator;