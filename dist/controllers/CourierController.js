'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _index = require('../services/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import ResponseBuilder from '../helpers/ResponseBuilder';

var CourierController =
/**
 * Courier Controller
 */
function CourierController() {
  (0, _classCallCheck3.default)(this, CourierController);

  this.service = new _index.CourierService();
};

exports.default = CourierController;