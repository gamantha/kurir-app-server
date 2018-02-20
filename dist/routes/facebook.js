'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/login', function (req, res) {
  _controllers.facebookController.login(req, res);
});

router.post('/register', function (req, res) {
  _controllers.facebookController.register(req, res);
});

module.exports = router;