var express = require('express');
var router = express.Router();
var cors = require('cors');

import MemberController from '../controllers/membersController';
import UserValidator from '../../utility/validator/userValidator';

const memberController = new MemberController();
const userValidator = new UserValidator();
router.use(cors());
// router.post('/owner/list',societyController.getOwnerList);

/******Add Api********/
router.post('/registerRole', memberController.registerRole);
router.post('/registerPlan', memberController.registerPlan);
router.post('/registerMember', memberController.registerMember);
router.post('/registerMemberShip', memberController.registerMembership);


/******Update Api******/
// router.post('/updatePlan',memberController.updatePlan);
router.post('/updateMember', memberController.updateMember);
// router.post('/updateMembership',memberController.updateMembership);

/*******Delete Api*********/
// router.delete('/delete', memberController.deleteRow);

/********Search******/
router.get('/:tableName', memberController.getDetails);
router.get('/:tableName/:columnName', memberController.getDetailsUsingQueryParam);

module.exports = router;