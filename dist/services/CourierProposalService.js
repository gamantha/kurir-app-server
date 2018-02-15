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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseService2 = require('./BaseService');

var _BaseService3 = _interopRequireDefault(_BaseService2);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CourierProposalService = function (_BaseService) {
  (0, _inherits3.default)(CourierProposalService, _BaseService);

  /**
   * Courier Proposal specific service class
   */
  function CourierProposalService() {
    (0, _classCallCheck3.default)(this, CourierProposalService);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CourierProposalService.__proto__ || Object.getPrototypeOf(CourierProposalService)).call(this, _models2.default.CourierProposal));

    _this.userModel = _models2.default.User;
    return _this;
  }

  (0, _createClass3.default)(CourierProposalService, [{
    key: 'proposalRejected',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(status, rejectReason, userId) {
        var updated;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _get3.default)(CourierProposalService.prototype.__proto__ || Object.getPrototypeOf(CourierProposalService.prototype), 'update', this).call(this, {
                  status: status,
                  rejectDate: new Date(),
                  acceptDate: null,
                  rejectReason: rejectReason
                }, {
                  UserId: userId
                }, {
                  returning: true,
                  plain: true
                });

              case 2:
                updated = _context.sent;
                _context.next = 5;
                return this.userModel.update({
                  role: 'sender'
                }, {
                  where: {
                    id: userId
                  }
                });

              case 5:
                return _context.abrupt('return', updated);

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function proposalRejected(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return proposalRejected;
    }()
  }, {
    key: 'proposalAccepted',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(status, rejectReason, userId) {
        var updated;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _get3.default)(CourierProposalService.prototype.__proto__ || Object.getPrototypeOf(CourierProposalService.prototype), 'update', this).call(this, {
                  status: status,
                  acceptDate: new Date(),
                  rejectDate: null,
                  rejectReason: null
                }, {
                  UserId: userId
                }, {
                  returning: true,
                  plain: true
                });

              case 2:
                updated = _context2.sent;
                _context2.next = 5;
                return this.userModel.update({
                  role: 'sender+kurir'
                }, {
                  where: {
                    id: userId
                  }
                });

              case 5:
                return _context2.abrupt('return', updated);

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function proposalAccepted(_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      }

      return proposalAccepted;
    }()
  }, {
    key: 'proposalWaiting',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(status, rejectReason, userId) {
        var updated;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _get3.default)(CourierProposalService.prototype.__proto__ || Object.getPrototypeOf(CourierProposalService.prototype), 'update', this).call(this, {
                  status: status,
                  rejectDate: null,
                  acceptDate: null,
                  rejectReason: null
                }, {
                  UserId: userId
                }, {
                  returning: true,
                  plain: true
                });

              case 2:
                updated = _context3.sent;
                _context3.next = 5;
                return this.update({
                  role: 'sender'
                }, {
                  where: {
                    id: userId
                  }
                });

              case 5:
                return _context3.abrupt('return', updated);

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function proposalWaiting(_x7, _x8, _x9) {
        return _ref3.apply(this, arguments);
      }

      return proposalWaiting;
    }()
  }]);
  return CourierProposalService;
}(_BaseService3.default);

exports.default = CourierProposalService;