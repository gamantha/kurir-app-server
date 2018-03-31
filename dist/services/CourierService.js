'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseService2 = require('./BaseService');

var _BaseService3 = _interopRequireDefault(_BaseService2);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CourierService = function (_BaseService) {
  (0, _inherits3.default)(CourierService, _BaseService);

  /**
   * Courier specific service class
   */
  function CourierService() {
    (0, _classCallCheck3.default)(this, CourierService);
    return (0, _possibleConstructorReturn3.default)(this, (CourierService.__proto__ || Object.getPrototypeOf(CourierService)).call(this, _models2.default.Courier));
  }

  return CourierService;
}(_BaseService3.default);

exports.default = CourierService;