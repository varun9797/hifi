process.env.SECRET_KEY = 'varunv';
import QueryMediator from '../../utility/controller/queryConnection';



class SocietyModel {

    constructor() {
        this.queryMediator = new QueryMediator();
    }


    registerRole = (req) => new Promise((resolve, reject) => {
        let query = `insert into role(roleName) values('${req.body.roleName.toLowerCase()}');`;
        this.queryMediator.queryConnection(query).then((result) => {
            console.log('Building is successfully Inserted: Ok ');
            resolve(result);
        }).catch((err) => {
            console.log('got query error ', err);
            reject(err);
        });
    });

    registerPlan = (req) => new Promise((resolve, reject) => {
        let query = `insert into plan(planName, planDisplayName, createdBy) values('${req.body.planName}', '${req.body.planDisplayName}', ${req.body.createdBy});`;
        this.queryMediator.queryConnection(query).then((result) => {
            console.log('Building is successfully Inserted: Ok ');
            resolve(result);
        }).catch((err) => {
            console.log('got query error ', err);
            reject(err);
        });
    });

    registerMember = (req) => new Promise((resolve, reject) => {
        let query = `insert into member(firstName, middleName, lastName, mobileNumber, dateOfBirth, gender, address, city, area, emailId, username, password, RoleId, createdBy) values('${req.body.firstName.toLowerCase()}', '${req.body.middleName.toLowerCase()}', '${req.body.lastName.toLowerCase()}', ${req.body.mobileNumber}, '${req.body.dateOfBirth}', '${req.body.gender.toLowerCase()}', '${req.body.address}', '${req.body.city.toLowerCase()}', '${req.body.area.toLowerCase()}', '${req.body.emailId}', '${req.body.username.toLowerCase()}', '${req.body.password}', ${req.body.RoleId}, ${req.body.createdBy});`;
        this.queryMediator.queryConnection(query).then((result) => {
            console.log('Building is successfully Inserted: Ok ');
            resolve(result);
        }).catch((err) => {
            console.log('got query error ', err);
            reject(err);
        });
    });

    registerMembership = (req) => new Promise((resolve, reject) => {
        let query = `insert into memberShip(MemberId, PlanId, allocatedOn, startTime, endTime, createdBy) values(${req.body.MemberId}, ${req.body.PlanId}, '${req.body.allocatedOn}', '${req.body.startTime}', '${req.body.endTime}' , ${req.body.createdBy});`;
        this.queryMediator.queryConnection(query).then((result) => {
            console.log('Building is successfully Inserted: Ok ');
            resolve(result);
        }).catch((err) => {
            console.log('got query error ', err);
            reject(err);
        });
    });

    updateMember = (req) => new Promise((resolve, reject) => {
        let query = `UPDATE member SET firstName = '${req.body.firstName}', middleName = '${req.body.middleName}', lastName = '${req.body.lastName}', mobileNumber = ${req.body.mobileNumber}, dateOfBirth = '${req.body.dateOfBirth}', gender = '${req.body.gender}', address = '${req.body.address}', city = '${req.body.city}', area = '${req.body.area}', emailId = '${req.body.emailId}', RoleId = ${req.body.RoleId}, updatedAt = now() WHERE idmember = ${req.body.idmember};`;
        this.queryMediator.queryConnection(query).then((result) => {
            console.log('Building is successfully Inserted: Ok ');
            resolve(result);
        }).catch((err) => {
            console.log('got query error ', err);
            reject(err);
        });
    });

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