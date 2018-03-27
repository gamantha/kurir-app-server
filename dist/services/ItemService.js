'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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
      }, { model: _models2.default.Receiver }, {
        model: _models2.default.Courier,
        include: [{
          model: _models2.default.User,
          attributes: { exclude: ['password', 'forgotPassVeriCode'] }
        }]
      }];
    }
  }, {
    key: 'returnSenderId',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(userId) {
        var sender;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _models2.default.Sender.findOne({ where: { UserId: userId } });

              case 3:
                sender = _context.sent;
                return _context.abrupt('return', sender.dataValues.id);

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);
                return _context.abrupt('return', _context.t0.message);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function returnSenderId(_x) {
        return _ref.apply(this, arguments);
      }

      return returnSenderId;
    }()

    /**
     * Get courier item history
     * @param {Request} req 
     * @param {Integer} page 
     * @param {Integer} limit 
     * @param {Array} fields 
     * @param {String} order 
     * @param {Integer} courierId 
     */

  }, {
    key: 'getCourierHistory',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, page, limit, fields, order, userId, senderId) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.paginate(req, page, limit, order, fields, undefined, {
                  $or: [{
                    courierId: userId
                  }, {
                    senderId: senderId
                  }]
                });

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getCourierHistory(_x2, _x3, _x4, _x5, _x6, _x7, _x8) {
        return _ref2.apply(this, arguments);
      }

      return getCourierHistory;
    }()

    /**
     * Get sender item history
     * @param {Request} req
     * @param {Integer} page 
     * @param {Integer} limit 
     * @param {Array} fields 
     * @param {String} order 
     * @param {Integer} senderId
     */

  }, {
    key: 'getSenderHistory',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, page, limit, fields, order, senderId) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.paginate(req, page, limit, order, fields, undefined, {
                  senderId: senderId
                });

              case 2:
                return _context3.abrupt('return', _context3.sent);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getSenderHistory(_x9, _x10, _x11, _x12, _x13, _x14) {
        return _ref3.apply(this, arguments);
      }

      return getSenderHistory;
    }()
  }]);
  return ItemService;
}(_BaseService3.default);

exports.default = ItemService;