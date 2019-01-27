'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _membersModel = require('../models/membersModel');

var _membersModel2 = _interopRequireDefault(_membersModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

process.env.SECRET_KEY = 'varunv';

var SocietyController = function SocietyController() {
    var _this = this;

    _classCallCheck(this, SocietyController);

    this.registerOwner = function (req, res) {
        _this.societyModel.registerOwner(req).then(function (dbResponse) {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch(function (err) {
            console.log('catch block of registerOwner ', err);
            res.status(err.satusCode).json(err);
        });
    };

    this.getDetails = function (req, res) {
        console.log('checking auto deploye1111');
        _this.societyModel.getDetails(req).then(function (dbResponse) {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch(function (err) {
            console.log('catch block of getDetails', err);
            res.status(err.satusCode).json(err);
        });
    };

    this.getDetailsUsingQueryParam = function (req, res) {
        console.log('select * from ' + req.params.tableName + ' where ' + req.params.columnName + ' = ' + req.query.value);
        _this.societyModel.getDetailsUsingQueryParam(req).then(function (dbResponse) {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch(function (err) {
            console.log('catch block of getDetailsUsingQueryParam', err);
            res.status(err.satusCode).json(err);
        });
    };

    this.updatePendingPaymentOfFlat = function (req, res) {
        console.log('update flat set pendingpayment = \'' + req.body.pendingPayment + '\' where ownerid =' + req.body.ownerid + ' and flatId =' + req.body.flatid + ';');
        _this.societyModel.updatePendingPaymentOfFlat(req).then(function (dbResponse) {
            console.log('updatePendingPaymentOfFlat successfully done!!');
            _this.updatePaymentHistory(req, function (resFlag, responseData) {
                if (resFlag) {
                    res.status(dbResponse.satusCode).json(responseData);
                } else {

                    res.status(400).json(responseData);
                }
            });
        }).catch(function (err) {
            console.log('catch block of updatePendingPaymentOfFlat', err);
            res.status(err.satusCode).json(err);
        });
    };

    this.updatePaymentHistory = function (reqBody, callback) {
        var currentDate = new Date();
        //console.log(`update paymentHistory set paymentHistory = '${req.body.pendingPayment}' where ownerid =${req.body.ownerid} and flatId =${req.body.flatid};`)
        console.log('insert into paymenthistory(flatid,paid,createddate,updateddate,ownerid) values (' + reqBody.body.flatid + ',' + reqBody.body.pendingPayment + ',\'' + currentDate.toISOString() + '\',\'' + currentDate.toISOString() + '\',' + reqBody.body.ownerid + ');');
        _this.societyModel.updatePaymentHistory(reqBody).then(function (dbResponse) {
            callback(true, dbResponse);
        }).catch(function (err) {
            console.log('catch block of updatePaymentHistory', err);
            callback(false, err);
        });
    };

    this.registerBuilding = function (req, res) {
        console.log('insert into building(buildingname, societyid) values\n        (' + req.body.buildingName + ',\'' + req.body.societyid + '\');');
        _this.societyModel.registerBuilding(req).then(function (dbResponse) {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch(function (err) {
            console.log('catch block of registerBuilding ', err);
            res.status(err.satusCode).json(err);
        });
    };

    this.registerSociety = function (req, res) {
        console.log('society register query is--- \n        insert into society(societyName, address, pincode) values \n        (\'' + req.body.societyName + '\', \'' + req.body.address + '\', \'' + req.body.pincode + '\'');
        _this.societyModel.registerSociety(req).then(function (dbResponse) {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch(function (err) {
            console.log('catch block of registerSociety ', err);
            res.status(err.satusCode).json(err);
        });
    };

    this.getOwnerList = function (req, res) {
        console.log('call get_owner_details(' + req.body.societyIds + ', ' + req.body.buildingNames + ', ' + req.body.flatIds + ')');
        _this.societyModel.getOwnerList(req).then(function (dbResponse) {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch(function (err) {
            console.log('catch block of getOwnerList ', err);
            res.status(err.satusCode).json(err);
        });
    };

    this.registerFlat = function (req, res) {
        console.log('insert into flat(flatname, buildingname, societyid) values (\'' + req.body.flatName + '\', \'' + req.body.buildingName + '\', ' + req.body.societyId + ');');
        _this.societyModel.registerFlat(req).then(function (dbResponse) {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch(function (err) {
            console.log('catch block of registerFlat ', err);
            res.status(err.satusCode).json(err);
        });
    };

    this.deleteRow = function (req, res) {
        console.log('delete from ' + req.body.tableName + ' where ' + req.body.columnName + ' = ' + req.body.columnValue);
        _this.societyModel.deleteRow(req).then(function (dbResponse) {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch(function (err) {
            console.log('catch block of registerOwner ', err);
            res.status(err.satusCode).json(err);
        });
    };

    this.updateBuilding = function (req, res) {
        console.log('insert into building(buildingname, societyid) values\n        (' + req.body.buildingName + ',\'' + req.body.societyid + '\');');
        _this.societyModel.updateBuilding(req).then(function (dbResponse) {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch(function (err) {
            console.log('catch block of updateBuilding ', err);
            res.status(err.satusCode).json(err);
        });
    };

    this.updateSociety = function (req, res) {
        console.log('society register query is--- \n        insert into society(societyName, address, pincode) values \n        (\'' + req.body.societyName + '\', \'' + req.body.address + '\', \'' + req.body.pincode + '\'');
        _this.societyModel.updateSociety(req).then(function (dbResponse) {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch(function (err) {
            console.log('catch block of updateSociety ', err);
            res.status(err.satusCode).json(err);
        });
    };

    this.updateFlat = function (req, res) {
        console.log('insert into flat(flatname, buildingname, societyid) values (\'' + req.body.flatName + '\', \'' + req.body.buildingName + '\', ' + req.body.societyId + ');');
        _this.societyModel.updateFlat(req).then(function (dbResponse) {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch(function (err) {
            console.log('catch block of updateFlat ', err);
            res.status(err.satusCode).json(err);
        });
    };

    this.updateOwner = function (req, res) {
        _this.societyModel.updateOwner(req).then(function (dbResponse) {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch(function (err) {
            console.log('catch block of updateOwner ', err);
            res.status(err.satusCode).json(err);
        });
    };

    this.societyModel = new _membersModel2.default();
};

exports.default = SocietyController;
//# sourceMappingURL=membersController.js.map