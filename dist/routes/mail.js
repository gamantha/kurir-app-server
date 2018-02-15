'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


router.get('/tokens/:token', function (req, res) {
  _controllers.mailController.checkEmail(req, res);
});

router.post('/validation-link', function (req, res) {
  _controllers.mailController.sendRegisValidationLink(req, res);
});

router.post('/forgot-password', function (req, res) {
  _controllers.mailController.sendForgotPassVerifCode(req, res);
});

router.post('/check-code', function (req, res) {
  _controllers.mailController.checkForgotPassVeriCode(req, res);
});

module.exports = router;