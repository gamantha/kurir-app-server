'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


router.get('/registration/check/:token', function (req, res) {
  _controllers.mailController.checkEmail(req, res);
});

router.post('/registration/link', function (req, res) {
  _controllers.mailController.sendRegisValidationLink(req, res);
});

router.get('/article/how-kuririd-works/', function (req, res) {
  _controllers.mailController.sendWorksPage(req, res);
});

module.exports = router;