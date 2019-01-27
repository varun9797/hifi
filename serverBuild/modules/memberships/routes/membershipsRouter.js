'use strict';

var _membershipsController = require('../controllers/membershipsController');

var _membershipsController2 = _interopRequireDefault(_membershipsController);

var _userValidator = require('../../utility/validator/userValidator');

var _userValidator2 = _interopRequireDefault(_userValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();
var cors = require('cors');

var userController = new _membershipsController2.default();
var userValidator = new _userValidator2.default();
router.use(cors());
router.get('/validateToken', userValidator.validateToken);
router.post('/executeQuery', userController.executeQuery);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/getUser', userValidator.validateUser, userController.getUser);

module.exports = router;
//# sourceMappingURL=membershipsRouter.js.map