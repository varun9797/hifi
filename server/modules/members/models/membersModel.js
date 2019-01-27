process.env.SECRET_KEY = 'varunv';
import QueryMediator from '../../utility/controller/queryConnection';



class SocietyModel {

    constructor() {
        this.queryMediator = new QueryMediator();
    }

    
    getOwner = (req, searchData) => new Promise((resolve, reject) => {
        let query = `select ownerid from owner where phonenumber = ${searchData[0]} and email = \'${searchData[1]}\' `;
        this.queryMediator.queryConnection(query).then((result) => {
            console.log('getOwner : Ok ');
            resolve(result);
        }).catch((err) => {
            console.log('got query error ', err);
            reject(err);
        });
    })

    getOwnerList = (req) => new Promise((resolve, reject) => {
        var societyIds = (req.body.societyIds && req.body.societyIds.length > 0) ? `'${req.body.societyIds}'` : null;
        var buildingNames = (req.body.buildingNames && req.body.buildingNames.length > 0) ? `'${req.body.buildingNames}'` : null;
        var flatIds = (req.body.flatIds && req.body.flatIds.length > 0) ? `'${req.body.flatIds}'` : null;

        let query = `call get_owner_details(${societyIds}, ${buildingNames}, ${flatIds})`;
        console.log(`call get_owner_details(${societyIds}, ${buildingNames}, ${flatIds})`);
        this.queryMediator.queryConnection(query).then((result) => {
            console.log('getOwnerList : Ok ');
            resolve(result);
        }).catch((err) => {
            console.log('got query error ', err);
            reject(err);
        });
    })

    updateFlat = (req, searchData, updateValue) => new Promise((resolve, reject) => {
        console.log('searchData is ', searchData);
        console.log('update value is ', updateValue);

        let query = `update flat set ownerid = ${updateValue} where societyid = ${searchData[0]} and buildingname = '${searchData[1]}' and flatname = '${searchData[2]}'`;
        this.queryMediator.queryConnection(query).then((result) => {
            console.log('updateFlat : Ok ');
            resolve(result);
        }).catch((err) => {
            console.log('got query error ', err);
            console.log(`query is ------------ update flat set ownerid = ${updateValue} where societyid = ${searchData[0]} and buildingname = ${searchData[1]} and flatname = ${searchData[2]}`);
            reject(err);
        });
    })

    registerOwner = async (req) => {
        var flatData = [req.body.societyId, req.body.buildingName, req.body.flatNumber];
        var ownerSearchData = [req.body.phoneNumber, req.body.email];
        var ownerInsertData = [[req.body.ownerName, req.body.isAdmin, req.body.phoneNumber, req.body.email, req.body.age, req.body.gender, req.body.password]];

        let query = 'insert into owner(ownername,isadmin,phonenumber,email, age, gender, password) values ?';
        try {
            await this.queryMediator.queryConnection(query, ownerInsertData);
            let fetchOwnerResponse = await this.getOwner(null, ownerSearchData);
            let insertMappingResponse = await this.updateFlat(null, flatData, fetchOwnerResponse.dbResponse[0].ownerid);
            console.log('Owner Registered Successfully: Ok');
            return insertMappingResponse;
        } catch (err) {
            console.log('got query error ', err);
            return err;
        }
    }

    getDetails = (req) => new Promise((resolve, reject) => {
        console.log('req.params.tableName', req.params.tableName);
        let query = `select * from ${req.params.tableName}`;
        this.queryMediator.queryConnection(query).then((result) => {
            console.log('getDetails : Ok ');
            resolve(result);
        }).catch((err) => {
            console.log('got query error ', err);
            reject(err);
        });
    })

    getDetailsUsingQueryParam = (req) => new Promise((resolve, reject) => {
        console.log('req.params.tableName', req.params.tableName);
        let query = `select * from ${req.params.tableName} where ${req.params.columnName} = ${req.query.value}`;
        this.queryMediator.queryConnection(query).then((result) => {
            console.log('select query working fine : Ok ');
            resolve(result);
        }).catch((err) => {
            console.log('got query error ', err);
            reject(err);
        });
    })

    updatePendingPaymentOfFlat = (req) => new Promise((resolve, reject) => {
        console.log('req.params.tableName', req.params.tableName);

        let query = `update flat set pendingpayment = '${req.body.pendingPayment}' where ownerid =${req.body.ownerid} and flatId =${req.body.flatid}`;
        this.queryMediator.queryConnection(query).then((result) => {
            console.log('pending payment successfully updated : Ok ');
            resolve(result);
        }).catch((err) => {
            console.log('got query error ', err);
            reject(err);
        });
    })

    updatePaymentHistory = (req) => new Promise((resolve, reject) => {
        const currentDate = new Date();

        let query = `insert into paymenthistory(flatid,paid,createddate,updateddate,ownerid) values (${req.body.flatid},${req.body.pendingPayment},'${currentDate.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2')}','${currentDate.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2')}',${req.body.ownerid});`;
        this.queryMediator.queryConnection(query).then((result) => {
            console.log('pending payment history successfully updated : Ok ');
            resolve(result);
        }).catch((err) => {
            console.log('got query error ', err);
            reject(err);
        });
    });

    registerBuilding = (req) => new Promise((resolve, reject) => {
        let query = `insert into building(buildingname, societyid) values('${req.body.buildingName}',${req.body.societyid});`;
        this.queryMediator.queryConnection(query).then((result) => {
            console.log('Building is successfully Inserted: Ok ');
            resolve(result);
        }).catch((err) => {
            console.log('got query error ', err);
            reject(err);
        });
    });

    registerSociety = (req) => new Promise((resolve, reject) => {
        let query = `insert into society(societyName, address, pincode) values ('${req.body.societyName}', '${req.body.address}', '${req.body.pincode}');`;
        this.queryMediator.queryConnection(query).then((result) => {
            console.log('Society is successfully Inserted : Ok ');
            resolve(result);
        }).catch((err) => {
            console.log('got query error ', err);
            reject(err);
        });
    });

    registerFlat = (req) => new Promise((resolve, reject) => {
        let query = `insert into flat(flatname, buildingname, societyid) values ('${req.body.flatName}', '${req.body.buildingName}', ${req.body.societyId});`;
        this.queryMediator.queryConnection(query).then((result) => {
            console.log('Flat is successfully Inserted : Ok ');
            resolve(result);
        }).catch((err) => {
            console.log('got query error ', err);
            reject(err);
        });
    });

    updateBuilding = (req) => new Promise((resolve, reject) => {
        let query = `insert into building(buildingname, societyid) values('${req.body.buildingName}',${req.body.societyid});`;
        this.queryMediator.queryConnection(query).then((result) => {
            console.log('Building is successfully Updated: Ok ');
            resolve(result);
        }).catch((err) => {
            console.log('got query error ', err);
            reject(err);
        });
    });

    updateSociety = (req) => new Promise((resolve, reject) => {
        let query = `insert into society(societyName, address, pincode) values ('${req.body.societyName}', '${req.body.address}', '${req.body.pincode}');`;
        this.queryMediator.queryConnection(query).then((result) => {
            console.log('Society is successfully Updated : Ok ');
            resolve(result);
        }).catch((err) => {
            console.log('got query error ', err);
            reject(err);
        });
    });

    updateFlat = (req) => new Promise((resolve, reject) => {
        let query = `insert into flat(flatname, buildingname, societyid) values ('${req.body.flatName}', '${req.body.buildingName}', ${req.body.societyId});`;
        this.queryMediator.queryConnection(query).then((result) => {
            console.log('Flat is successfully Updated : Ok ');
            resolve(result);
        }).catch((err) => {
            console.log('got query error ', err);
            reject(err);
        });
    });

    updateOwner = (req) => new Promise((resolve, reject) => {
        let query = `insert into flat(flatname, buildingname, societyid) values ('${req.body.flatName}', '${req.body.buildingName}', ${req.body.societyId});`;
        this.queryMediator.queryConnection(query).then((result) => {
            console.log('Flat is successfully Updated : Ok ');
            resolve(result);
        }).catch((err) => {
            console.log('got query error ', err);
            reject(err);
        });
    });

    deleteRow = (req) => new Promise((resolve, reject) => {
        let query = `delete from ${req.body.tableName} where ${req.body.columnName} = ${req.body.columnValue}`;
        this.queryMediator.queryConnection(query).then((result) => {
            console.log('delete successfully : Ok ');
            resolve(result);
        }).catch((err) => {
            console.log('got query error while deleting ', err);
            reject(err);
        });
    });
}

export default SocietyModel;