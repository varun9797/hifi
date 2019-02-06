import SocietyModel from '../models/membersModel';
process.env.SECRET_KEY = 'varunv';

class MemberController {
    constructor() {
        this.societyModel = new SocietyModel();
    }

    registerRole = (req, res) => {
        console.log('registerRole ->\n');
        console.log(`insert into role(roleName) values('${req.body.roleName.toLowerCase()}');`);
        this.societyModel.registerRole(req).then((dbResponse) => {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch((err) => {
            console.log('catch block of registerOwner ', err);
            res.status(err.satusCode).json(err);
        });
    }

    registerPlan = (req, res) => {
        console.log('registerPlan ->\n');
        console.log(`insert into plan(planName, planDisplayName, createdBy) values('${req.body.planName}', '${req.body.planDisplayName}', ${req.body.createdBy});`);
        this.societyModel.registerPlan(req).then((dbResponse) => {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch((err) => {
            console.log('catch block of registerOwner ', err);
            res.status(err.satusCode).json(err);
        });
    }

    registerMember = (req, res) => {
        console.log('registerMember ->\n');
        console.log(`insert into member(firstName, middleName, lastName, mobileNumber, dateOfBirth, gender, address, city, area, emailId, username, password, RoleId, createdBy) values('${req.body.firstName.toLowerCase()}', '${req.body.middleName.toLowerCase()}', '${req.body.lastName.toLowerCase()}', ${req.body.mobileNumber}, '${req.body.dateOfBirth}', '${req.body.gender.toLowerCase()}', '${req.body.address}', '${req.body.city.toLowerCase()}', '${req.body.area.toLowerCase()}', '${req.body.emailId}', '${req.body.username.toLowerCase()}', '${req.body.password}', ${req.body.RoleId}, ${req.body.createdBy});`);
        this.societyModel.registerMember(req).then((dbResponse) => {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch((err) => {
            console.log('catch block of registerOwner ', err);
            res.status(err.satusCode).json(err);
        });
    }

    registerMembership = (req, res) => {
        console.log(`insert into memberShip(MemberId, PlanId, allocatedOn, startTime, endTime, createdBy) values(${req.body.MemberId}, ${req.body.PlanId}, '${req.body.allocatedOn}', '${req.body.startTime}', '${req.body.endTime}', ${req.body.createdBy});`);
        this.societyModel.registerMembership(req).then((dbResponse) => {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch((err) => {
            console.log('catch block of registerOwner ', err);
            res.status(err.satusCode).json(err);
        });
    }

    updateMember = (req, res) => {
        console.log('updateMember ->\n');
        console.log(new Date().toISOString().replace('T', ' ').substring(0, 19));
        console.log(`UPDATE member SET firstName = '${req.body.firstName}', middleName = '${req.body.middleName}', lastName = '${req.body.lastName}', mobileNumber = ${req.body.mobileNumber}, dateOfBirth = '${req.body.dateOfBirth}', gender = '${req.body.gender}', address = '${req.body.address}', city = '${req.body.city}', area = '${req.body.area}', emailId = '${req.body.emailId}', RoleId = ${req.body.RoleId}, updatedAt = now() WHERE idmember = ${req.body.idmember};`);
        this.societyModel.updateMember(req).then((dbResponse) => {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch((err) => {
            console.log('catch block of registerOwner ', err);
            res.status(err.satusCode).json(err);
        });
    }

    getDetails = (req, res) => {
        console.log('checking auto deploye1111');
        this.societyModel.getDetails(req).then((dbResponse) => {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch((err) => {
            console.log('catch block of getDetails', err);
            res.status(err.satusCode).json(err);
        });
    }

    getDetailsUsingQueryParam = (req, res) => {
        console.log(`select * from ${req.params.tableName} where ${req.params.columnName} = ${req.query.value}`);
        this.societyModel.getDetailsUsingQueryParam(req).then((dbResponse) => {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch((err) => {
            console.log('catch block of getDetailsUsingQueryParam', err);
            res.status(err.satusCode).json(err);
        });
    }

    deleteRow = (req, res) => {
        console.log(`delete from ${req.body.tableName} where ${req.body.columnName} = ${req.body.columnValue};`);
        this.societyModel.deleteRow(req).then((dbResponse) => {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch((err) => {
            console.log('catch block of registerOwner ', err);
            res.status(err.satusCode).json(err);
        });
    }

}

export default MemberController;