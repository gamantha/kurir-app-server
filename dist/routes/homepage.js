'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


router.get('article/how-kuririd-works/', function (req, res) {
  _controllers.homepageController.sendWorksPage(req, res);
});

module.exports = router;