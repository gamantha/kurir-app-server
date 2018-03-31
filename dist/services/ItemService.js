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

var _UserService = require('./UserService');

var _UserService2 = _interopRequireDefault(_UserService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import CourierService from './CourierService';
var ItemService = function (_BaseService) {
  (0, _inherits3.default)(ItemService, _BaseService);

  /**
   * Item specific service class
   */
  function ItemService() {
    (0, _classCallCheck3.default)(this, ItemService);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ItemService.__proto__ || Object.getPrototypeOf(ItemService)).call(this, _models2.default.Item));

    _this.userService = new _UserService2.default();
    // this.courierService = new CourierService();
    return _this;
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

    /**
     * Assign item to courier
     * @param {integer} userId
     * @param {string} ticketNumber
     */

  }, {
    key: 'assignItemToCourier',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(userId, ticketNumber) {
        var foundCourier, foundTicketNumber, updatedItem;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this.userService.findOne({ id: userId }, undefined);

              case 3:
                foundCourier = _context4.sent;
                _context4.next = 6;
                return this.findOne({ ticketNumber: ticketNumber }, undefined);

              case 6:
                foundTicketNumber = _context4.sent;

                if (!(foundTicketNumber === null)) {
                  _context4.next = 11;
                  break;
                }

                throw Error('Ticket number doesn\'t exist');

              case 11:
                if (!(foundCourier === null)) {
                  _context4.next = 15;
                  break;
                }

                throw Error('There is no user available');

              case 15:
                if (!(foundCourier.dataValues.role !== 'sender+kurir')) {
                  _context4.next = 19;
                  break;
                }

                throw Error('This user is not a courier');

              case 19:
                _context4.next = 21;
                return this.update({ courierId: foundCourier.id }, { ticketNumber: ticketNumber }, {
                  returning: true,
                  plain: true
                });

              case 21:
                updatedItem = _context4.sent;
                return _context4.abrupt('return', updatedItem.dataValues);

              case 23:
                _context4.next = 28;
                break;

              case 25:
                _context4.prev = 25;
                _context4.t0 = _context4['catch'](0);
                throw Error(_context4.t0.message);

              case 28:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 25]]);
      }));

      function assignItemToCourier(_x15, _x16) {
        return _ref4.apply(this, arguments);
      }

      return assignItemToCourier;
    }()
  }]);
  return ItemService;
}(_BaseService3.default);

exports.default = ItemService;