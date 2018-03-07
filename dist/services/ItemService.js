'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseService2 = require('./BaseService');

var _BaseService3 = _interopRequireDefault(_BaseService2);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ItemService = function (_BaseService) {
  (0, _inherits3.default)(ItemService, _BaseService);

  /**
   * Item specific service class
   */
  function ItemService() {
    (0, _classCallCheck3.default)(this, ItemService);
    return (0, _possibleConstructorReturn3.default)(this, (ItemService.__proto__ || Object.getPrototypeOf(ItemService)).call(this, _models2.default.Item));
  }

  (0, _createClass3.default)(ItemService, [{
    key: 'generateTicketNumber',
    value: function generateTicketNumber() {
      return Date.now();
    }
  }, {
    key: 'returnInclude',
    value: function returnInclude() {
      return [{
        model: _models2.default.Sender,
        include: [{
          model: _models2.default.User,
          attributes: { exclude: ['password', 'forgotPassVeriCode'] }
        }]
      }, { model: _models2.default.Receiver }, { model: _models2.default.Courier }];
    }
  }]);
  return ItemService;
}(_BaseService3.default);

exports.default = ItemService;