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

var _helpers = require('../helpers');

var _helpers2 = _interopRequireDefault(_helpers);

var _BaseService2 = require('./BaseService');

var _BaseService3 = _interopRequireDefault(_BaseService2);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TokenService = function (_BaseService) {
  (0, _inherits3.default)(TokenService, _BaseService);

  /**
   * Token specific service class
   */
  function TokenService() {
    (0, _classCallCheck3.default)(this, TokenService);
    return (0, _possibleConstructorReturn3.default)(this, (TokenService.__proto__ || Object.getPrototypeOf(TokenService)).call(this, _models2.default.Token));
  }

  /**
   * Save jwt token to db and generate refresh token.
   * @param {String} token
   * @param {String} userAgent
   */


  (0, _createClass3.default)(TokenService, [{
    key: 'saveToken',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(token, userAgent) {
        var refreshToken, user, payload, exist, _token, response;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                refreshToken = _helpers2.default.refreshToken();
                user = _helpers2.default.verifyJwt(token);
                payload = {
                  accessToken: token,
                  refreshToken: refreshToken,
                  userId: user.id,
                  userAgent: userAgent
                };
                _context.prev = 4;
                _context.next = 7;
                return this.model.findOne({
                  where: {
                    userId: user.id,
                    userAgent: userAgent
                  },
                  include: [{
                    model: _models2.default.User,
                    attributes: { exclude: ['password'] },
                    required: true
                  }]
                });

              case 7:
                exist = _context.sent;

                if (!exist) {
                  _context.next = 20;
                  break;
                }

                _context.prev = 9;
                _context.next = 12;
                return this.model.update({
                  accessToken: token,
                  refreshToken: refreshToken
                }, { where: { id: exist.id } });

              case 12:
                exist.accessToken = token;
                exist.refreshToken = refreshToken;
                return _context.abrupt('return', exist);

              case 17:
                _context.prev = 17;
                _context.t0 = _context['catch'](9);
                throw Error(_context.t0.message);

              case 20:
                _context.prev = 20;
                _context.next = 23;
                return this.model.create(payload);

              case 23:
                _token = _context.sent;
                _context.next = 26;
                return this.model.findOne({
                  where: { id: _token.id },
                  include: [{
                    model: _models2.default.User,
                    attributes: { exclude: ['password'] },
                    required: true
                  }]
                });

              case 26:
                response = _context.sent;
                return _context.abrupt('return', response);

              case 30:
                _context.prev = 30;
                _context.t1 = _context['catch'](20);
                throw Error(_context.t1.message);

              case 33:
                _context.next = 38;
                break;

              case 35:
                _context.prev = 35;
                _context.t2 = _context['catch'](4);
                throw Error(_context.t2.message);

              case 38:
                _context.next = 43;
                break;

              case 40:
                _context.prev = 40;
                _context.t3 = _context['catch'](0);
                throw Error(_context.t3.message);

              case 43:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 40], [4, 35], [9, 17], [20, 30]]);
      }));

      function saveToken(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return saveToken;
    }()

    /**
     * refresh the token.
     * @param {String} bearer
     * @param {String} refreshToken
     * @param {String} userAgent
     */

  }, {
    key: 'refreshToken',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(bearer, _refreshToken, userAgent) {
        var token, payload, accessToken, newRefreshToken;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.model.findOne({
                  where: {
                    refreshToken: _refreshToken,
                    userAgent: userAgent,
                    accessToken: _helpers2.default.parseToken(bearer)
                  },
                  include: [{
                    model: _models2.default.User,
                    attributes: { exclude: ['password'] },
                    required: true
                  }]
                });

              case 3:
                token = _context2.sent;

                if (token) {
                  _context2.next = 6;
                  break;
                }

                throw Error('refresh token not found');

              case 6:
                // generate token here
                payload = {
                  email: token.User.email,
                  id: token.User.id
                };
                accessToken = _helpers2.default.createJWT(payload);
                newRefreshToken = _helpers2.default.refreshToken();
                _context2.prev = 9;
                _context2.next = 12;
                return this.model.update({
                  accessToken: accessToken,
                  refreshToken: newRefreshToken
                }, { where: { id: token.id } });

              case 12:
                token.accessToken = accessToken;
                token.refreshToken = newRefreshToken;
                return _context2.abrupt('return', token);

              case 17:
                _context2.prev = 17;
                _context2.t0 = _context2['catch'](9);
                throw Error(_context2.t0.message);

              case 20:
                _context2.next = 25;
                break;

              case 22:
                _context2.prev = 22;
                _context2.t1 = _context2['catch'](0);
                throw Error(_context2.t1.message);

              case 25:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 22], [9, 17]]);
      }));

      function refreshToken(_x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
      }

      return refreshToken;
    }()
  }]);
  return TokenService;
}(_BaseService3.default);

exports.default = TokenService;