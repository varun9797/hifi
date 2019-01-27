'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _queryConnection = require('../../utility/controller/queryConnection');

var _queryConnection2 = _interopRequireDefault(_queryConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

process.env.SECRET_KEY = 'varunv';

var SocietyModel = function SocietyModel() {
    var _this = this;

    _classCallCheck(this, SocietyModel);

    this.getOwner = function (req, searchData) {
        return new Promise(function (resolve, reject) {
            var query = 'select ownerid from owner where phonenumber = ' + searchData[0] + ' and email = \'' + searchData[1] + '\' ';
            _this.queryMediator.queryConnection(query).then(function (result) {
                console.log('getOwner : Ok ');
                resolve(result);
            }).catch(function (err) {
                console.log('got query error ', err);
                reject(err);
            });
        });
    };

    this.getOwnerList = function (req) {
        return new Promise(function (resolve, reject) {
            var societyIds = req.body.societyIds && req.body.societyIds.length > 0 ? '\'' + req.body.societyIds + '\'' : null;
            var buildingNames = req.body.buildingNames && req.body.buildingNames.length > 0 ? '\'' + req.body.buildingNames + '\'' : null;
            var flatIds = req.body.flatIds && req.body.flatIds.length > 0 ? '\'' + req.body.flatIds + '\'' : null;

            var query = 'call get_owner_details(' + societyIds + ', ' + buildingNames + ', ' + flatIds + ')';
            console.log('call get_owner_details(' + societyIds + ', ' + buildingNames + ', ' + flatIds + ')');
            _this.queryMediator.queryConnection(query).then(function (result) {
                console.log('getOwnerList : Ok ');
                resolve(result);
            }).catch(function (err) {
                console.log('got query error ', err);
                reject(err);
            });
        });
    };

    this.updateFlat = function (req, searchData, updateValue) {
        return new Promise(function (resolve, reject) {
            console.log('searchData is ', searchData);
            console.log('update value is ', updateValue);

            var query = 'update flat set ownerid = ' + updateValue + ' where societyid = ' + searchData[0] + ' and buildingname = \'' + searchData[1] + '\' and flatname = \'' + searchData[2] + '\'';
            _this.queryMediator.queryConnection(query).then(function (result) {
                console.log('updateFlat : Ok ');
                resolve(result);
            }).catch(function (err) {
                console.log('got query error ', err);
                console.log('query is ------------ update flat set ownerid = ' + updateValue + ' where societyid = ' + searchData[0] + ' and buildingname = ' + searchData[1] + ' and flatname = ' + searchData[2]);
                reject(err);
            });
        });
    };

    this.registerOwner = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req) {
            var flatData, ownerSearchData, ownerInsertData, query, fetchOwnerResponse, insertMappingResponse;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            flatData = [req.body.societyId, req.body.buildingName, req.body.flatNumber];
                            ownerSearchData = [req.body.phoneNumber, req.body.email];
                            ownerInsertData = [[req.body.ownerName, req.body.isAdmin, req.body.phoneNumber, req.body.email, req.body.age, req.body.gender, req.body.password]];
                            query = 'insert into owner(ownername,isadmin,phonenumber,email, age, gender, password) values ?';
                            _context.prev = 4;
                            _context.next = 7;
                            return _this.queryMediator.queryConnection(query, ownerInsertData);

                        case 7:
                            _context.next = 9;
                            return _this.getOwner(null, ownerSearchData);

                        case 9:
                            fetchOwnerResponse = _context.sent;
                            _context.next = 12;
                            return _this.updateFlat(null, flatData, fetchOwnerResponse.dbResponse[0].ownerid);

                        case 12:
                            insertMappingResponse = _context.sent;

                            console.log('Owner Registered Successfully: Ok');
                            return _context.abrupt('return', insertMappingResponse);

                        case 17:
                            _context.prev = 17;
                            _context.t0 = _context['catch'](4);

                            console.log('got query error ', _context.t0);
                            return _context.abrupt('return', _context.t0);

                        case 21:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[4, 17]]);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }();

    this.getDetails = function (req) {
        return new Promise(function (resolve, reject) {
            console.log('req.params.tableName', req.params.tableName);
            var query = 'select * from ' + req.params.tableName;
            _this.queryMediator.queryConnection(query).then(function (result) {
                console.log('getDetails : Ok ');
                resolve(result);
            }).catch(function (err) {
                console.log('got query error ', err);
                reject(err);
            });
        });
    };

    this.getDetailsUsingQueryParam = function (req) {
        return new Promise(function (resolve, reject) {
            console.log('req.params.tableName', req.params.tableName);
            var query = 'select * from ' + req.params.tableName + ' where ' + req.params.columnName + ' = ' + req.query.value;
            _this.queryMediator.queryConnection(query).then(function (result) {
                console.log('select query working fine : Ok ');
                resolve(result);
            }).catch(function (err) {
                console.log('got query error ', err);
                reject(err);
            });
        });
    };

    this.updatePendingPaymentOfFlat = function (req) {
        return new Promise(function (resolve, reject) {
            console.log('req.params.tableName', req.params.tableName);

            var query = 'update flat set pendingpayment = \'' + req.body.pendingPayment + '\' where ownerid =' + req.body.ownerid + ' and flatId =' + req.body.flatid;
            _this.queryMediator.queryConnection(query).then(function (result) {
                console.log('pending payment successfully updated : Ok ');
                resolve(result);
            }).catch(function (err) {
                console.log('got query error ', err);
                reject(err);
            });
        });
    };

    this.updatePaymentHistory = function (req) {
        return new Promise(function (resolve, reject) {
            var currentDate = new Date();

            var query = 'insert into paymenthistory(flatid,paid,createddate,updateddate,ownerid) values (' + req.body.flatid + ',' + req.body.pendingPayment + ',\'' + currentDate.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2') + '\',\'' + currentDate.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2') + '\',' + req.body.ownerid + ');';
            _this.queryMediator.queryConnection(query).then(function (result) {
                console.log('pending payment history successfully updated : Ok ');
                resolve(result);
            }).catch(function (err) {
                console.log('got query error ', err);
                reject(err);
            });
        });
    };

    this.registerBuilding = function (req) {
        return new Promise(function (resolve, reject) {
            var query = 'insert into building(buildingname, societyid) values(\'' + req.body.buildingName + '\',' + req.body.societyid + ');';
            _this.queryMediator.queryConnection(query).then(function (result) {
                console.log('Building is successfully Inserted: Ok ');
                resolve(result);
            }).catch(function (err) {
                console.log('got query error ', err);
                reject(err);
            });
        });
    };

    this.registerSociety = function (req) {
        return new Promise(function (resolve, reject) {
            var query = 'insert into society(societyName, address, pincode) values (\'' + req.body.societyName + '\', \'' + req.body.address + '\', \'' + req.body.pincode + '\');';
            _this.queryMediator.queryConnection(query).then(function (result) {
                console.log('Society is successfully Inserted : Ok ');
                resolve(result);
            }).catch(function (err) {
                console.log('got query error ', err);
                reject(err);
            });
        });
    };

    this.registerFlat = function (req) {
        return new Promise(function (resolve, reject) {
            var query = 'insert into flat(flatname, buildingname, societyid) values (\'' + req.body.flatName + '\', \'' + req.body.buildingName + '\', ' + req.body.societyId + ');';
            _this.queryMediator.queryConnection(query).then(function (result) {
                console.log('Flat is successfully Inserted : Ok ');
                resolve(result);
            }).catch(function (err) {
                console.log('got query error ', err);
                reject(err);
            });
        });
    };

    this.updateBuilding = function (req) {
        return new Promise(function (resolve, reject) {
            var query = 'insert into building(buildingname, societyid) values(\'' + req.body.buildingName + '\',' + req.body.societyid + ');';
            _this.queryMediator.queryConnection(query).then(function (result) {
                console.log('Building is successfully Updated: Ok ');
                resolve(result);
            }).catch(function (err) {
                console.log('got query error ', err);
                reject(err);
            });
        });
    };

    this.updateSociety = function (req) {
        return new Promise(function (resolve, reject) {
            var query = 'insert into society(societyName, address, pincode) values (\'' + req.body.societyName + '\', \'' + req.body.address + '\', \'' + req.body.pincode + '\');';
            _this.queryMediator.queryConnection(query).then(function (result) {
                console.log('Society is successfully Updated : Ok ');
                resolve(result);
            }).catch(function (err) {
                console.log('got query error ', err);
                reject(err);
            });
        });
    };

    this.updateFlat = function (req) {
        return new Promise(function (resolve, reject) {
            var query = 'insert into flat(flatname, buildingname, societyid) values (\'' + req.body.flatName + '\', \'' + req.body.buildingName + '\', ' + req.body.societyId + ');';
            _this.queryMediator.queryConnection(query).then(function (result) {
                console.log('Flat is successfully Updated : Ok ');
                resolve(result);
            }).catch(function (err) {
                console.log('got query error ', err);
                reject(err);
            });
        });
    };

    this.updateOwner = function (req) {
        return new Promise(function (resolve, reject) {
            var query = 'insert into flat(flatname, buildingname, societyid) values (\'' + req.body.flatName + '\', \'' + req.body.buildingName + '\', ' + req.body.societyId + ');';
            _this.queryMediator.queryConnection(query).then(function (result) {
                console.log('Flat is successfully Updated : Ok ');
                resolve(result);
            }).catch(function (err) {
                console.log('got query error ', err);
                reject(err);
            });
        });
    };

    this.deleteRow = function (req) {
        return new Promise(function (resolve, reject) {
            var query = 'delete from ' + req.body.tableName + ' where ' + req.body.columnName + ' = ' + req.body.columnValue;
            _this.queryMediator.queryConnection(query).then(function (result) {
                console.log('delete successfully : Ok ');
                resolve(result);
            }).catch(function (err) {
                console.log('got query error while deleting ', err);
                reject(err);
            });
        });
    };

    this.queryMediator = new _queryConnection2.default();
};

exports.default = SocietyModel;
//# sourceMappingURL=membersModel.js.map