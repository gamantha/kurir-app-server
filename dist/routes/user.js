'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

var _Auth = require('../helpers/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

var _SysAdmin = require('../helpers/SysAdmin');

var _SysAdmin2 = _interopRequireDefault(_SysAdmin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _SysAdmin2.default, function (req, res) {
  _controllers.userController.get(req, res);
});

router.post('/create', function (req, res) {
  _controllers.userController.create(req, res);
});

router.post('/check-forgot-password-verif-code', function (req, res) {
  _controllers.userController.checkForgotPassVeriCode(req, res);
});

router.post('/login', function (req, res) {
  _controllers.userController.login(req, res);
});

router.post('/refreshtoken', _Auth2.default, function (req, res) {
  _controllers.userController.refreshToken(req, res);
});

router.post('/logout', _Auth2.default, function (req, res) {
  _controllers.userController.logout(req, res);
});

router.post('/change-password', _Auth2.default, function (req, res) {
  _controllers.userController.changePassword(req, res);
});

router.post('/forgot-password', function (req, res) {
  _controllers.userController.forgotPassword(req, res);
});

router.delete('/deactivate', _Auth2.default, function (req, res) {
  _controllers.userController.deactivate(req, res);
});

router.post('/reactivate', function (req, res) {
  _controllers.userController.reactivate(req, res);
});

router.post('/upload-img', _Auth2.default, function (req, res) {
  _controllers.userController.uploadImg(req, res);
});

router.get('/confirmreactivation', function (req, res) {
  _controllers.userController.confirmReactivation(req, res);
});

router.post('/check-token', function (req, res) {
  _controllers.userController.checkToken(req, res);
});

module.exports = router;