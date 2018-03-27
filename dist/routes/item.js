'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

var _Auth = require('../helpers/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use(_Auth2.default);

router.get('/', function (req, res) {
  _controllers.itemController.get(req, res);
});

router.post('/current_trip', function (req, res) {
  _controllers.itemController.get_current_trip(req, res);
});

router.get('/history', function (req, res) {
  _controllers.itemController.get_history(req, res);
});

router.get('/:id', function (req, res) {
  _controllers.itemController.find(req, res);
});

router.put('/:id/reserve', function (req, res) {
  _controllers.itemController.reserve(req, res);
});

router.post('/', function (req, res) {
  _controllers.itemController.create(req, res);
});

router.delete('/:id', function (req, res) {
  _controllers.itemController.destroy(req, res);
});

router.put('/:id', function (req, res) {
  _controllers.itemController.update(req, res);
});

module.exports = router;