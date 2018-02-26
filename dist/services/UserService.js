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

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _BaseService2 = require('./BaseService');

var _BaseService3 = _interopRequireDefault(_BaseService2);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserService = function (_BaseService) {
  (0, _inherits3.default)(UserService, _BaseService);

  /**
   * User specific service class
   */
  function UserService() {
    (0, _classCallCheck3.default)(this, UserService);
    return (0, _possibleConstructorReturn3.default)(this, (UserService.__proto__ || Object.getPrototypeOf(UserService)).call(this, _models2.default.User));
  }

  /**
   * Confirm the token validity.
   * @param {String} token
   */


  (0, _createClass3.default)(UserService, [{
    key: 'confirmReactivation',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(token) {
        var options, payload;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = {
                  expiresIn: 60 * 60,
                  issuer: 'courier.id-backend',
                  jwtid: 'courier.user',
                  subject: 'reactivate-account'
                };
                _context.prev = 1;
                _context.next = 4;
                return _jsonwebtoken2.default.verify(token, process.env.SECRET, options);

              case 4:
                payload = _context.sent;
                _context.prev = 5;
                _context.next = 8;
                return this.update({ deletedAt: null }, { email: payload.email });

              case 8:
                return _context.abrupt('return', true);

              case 11:
                _context.prev = 11;
                _context.t0 = _context['catch'](5);
                throw Error(_context.t0);

              case 14:
                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t1 = _context['catch'](1);
                throw Error(_context.t1);

              case 19:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 16], [5, 11]]);
      }));

      function confirmReactivation(_x) {
        return _ref.apply(this, arguments);
      }

      return confirmReactivation;
    }()
    /**
     * Change user password here.
     * @param {String} email
     * @param {String} newPassword
     */

  }, {
    key: 'changePassword',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(email, newPassword) {
        var saltRounds, hash;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                saltRounds = 10;
                hash = _bcrypt2.default.hashSync(newPassword, saltRounds);
                _context2.next = 5;
                return this.update({ password: hash }, { email: email });

              case 5:
                return _context2.abrupt('return', true);

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2['catch'](0);
                throw Error(_context2.t0.message);

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 8]]);
      }));

      function changePassword(_x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return changePassword;
    }()
  }]);
  return UserService;
}(_BaseService3.default);

exports.default = UserService;