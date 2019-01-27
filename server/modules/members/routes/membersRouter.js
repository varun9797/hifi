var express = require('express');
var router = express.Router();
var cors = require('cors');

import SocietyController from '../controllers/membersController';
import UserValidator from '../../utility/validator/userValidator';

const societyController = new SocietyController();
const userValidator = new UserValidator();
router.use(cors());
router.post('/owner/list',societyController.getOwnerList);

/******Add Api********/
router.post('/registerBuilding',societyController.registerBuilding);
router.post('/registerFlat',societyController.registerFlat);
router.post('/registerSociety',societyController.registerSociety);
router.post('/registerOwner',societyController.registerOwner);

/******Update Api******/
router.post('/updateBuilding',societyController.updateBuilding);
router.post('/updateFlat',societyController.updateFlat);
router.post('/updateSociety',societyController.updateSociety);
router.post('/updateOwner',societyController.updateOwner);

/*******Delete Api*********/
router.delete('/delete',societyController.deleteRow);

/*******Update Pending Payment Api*************/
router.put('/flat/pendingPayment',userValidator.validateUser, societyController.updatePendingPaymentOfFlat);

/********Search******/
router.get('/:tableName/:columnName',societyController.getDetailsUsingQueryParam);
router.get('/:tableName',societyController.getDetails);


module.exports = router;