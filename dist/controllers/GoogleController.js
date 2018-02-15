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

var _helpers = require('../helpers');

var _helpers2 = _interopRequireDefault(_helpers);

var _index = require('../services/index');

var _ResponseBuilder = require('../helpers/ResponseBuilder');

var _ResponseBuilder2 = _interopRequireDefault(_ResponseBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GoogleController = function () {
  function GoogleController() {
    (0, _classCallCheck3.default)(this, GoogleController);

    this.googleService = new _index.GoogleService();
    this.userService = new _index.UserService();
    this.tokenService = new _index.TokenService();
  }

  (0, _createClass3.default)(GoogleController, [{
    key: 'login',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var tokenId, user, exist, userData, token, accessToken;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                tokenId = req.body.tokenId;

                if (!(typeof tokenId === 'undefined')) {
                  _context.next = 4;
                  break;
                }

                res.status(403).json(new _ResponseBuilder2.default().setMessage('Invalid payload').setSuccess(false).build());
                return _context.abrupt('return');

              case 4:
                _context.prev = 4;
                _context.next = 7;
                return this.googleService.verifyToken(tokenId);

              case 7:
                user = _context.sent;
                _context.next = 10;
                return this.userService.findOne({ email: user.email });

              case 10:
                exist = _context.sent;

                if (!(exist !== null)) {
                  _context.next = 28;
                  break;
                }

                // return token
                userData = Object.assign({
                  email: exist.email,
                  id: exist.id
                });
                token = _helpers2.default.createJWT(userData);
                _context.prev = 14;
                _context.next = 17;
                return this.tokenService.saveToken(token, req.headers['user-agent']);

              case 17:
                accessToken = _context.sent;

                res.status(200).json(new _ResponseBuilder2.default().setData(accessToken).setMessage('Logged in successfully').build());
                return _context.abrupt('return');

              case 22:
                _context.prev = 22;
                _context.t0 = _context['catch'](14);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context.t0.message).setSuccess(false).build());
                return _context.abrupt('return');

              case 26:
                _context.next = 30;
                break;

              case 28:
                res.status(200).json(new _ResponseBuilder2.default().setData({
                  email: user.email,
                  registered: false
                }).setMessage('User information retrieved successfully').build());
                return _context.abrupt('return');

              case 30:
                _context.next = 35;
                break;

              case 32:
                _context.prev = 32;
                _context.t1 = _context['catch'](4);

                res.status(400).json(new _ResponseBuilder2.default().setMessage('Provided tokenId is not valid').setSuccess(false).build());

              case 35:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 32], [14, 22]]);
      }));

      function login(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: 'register',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var tokenId, user, exist;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                tokenId = req.body.tokenId;

                if (!(typeof tokenId === 'undefined')) {
                  _context2.next = 4;
                  break;
                }

                res.status(403).json(new _ResponseBuilder2.default().setMessage('Invalid payload').setSuccess(false).build());
                return _context2.abrupt('return');

              case 4:
                _context2.prev = 4;
                _context2.next = 7;
                return this.googleService.verifyToken(tokenId);

              case 7:
                user = _context2.sent;
                _context2.next = 10;
                return this.userService.findOne({ email: user.email });

              case 10:
                exist = _context2.sent;

                if (!(exist !== null)) {
                  _context2.next = 16;
                  break;
                }

                res.status(200).json(new _ResponseBuilder2.default().setData({
                  registered: true
                }).setMessage('You have already registered with this email, procceed to login').setSuccess(false).build());
                return _context2.abrupt('return');

              case 16:
                res.status(200).json(new _ResponseBuilder2.default().setData({
                  email: user.email,
                  registered: false
                }).setMessage('User information retrieved successfully').build());
                return _context2.abrupt('return');

              case 18:
                _context2.next = 23;
                break;

              case 20:
                _context2.prev = 20;
                _context2.t0 = _context2['catch'](4);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context2.t0.message).setSuccess(false).build());

              case 23:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 20]]);
      }));

      function register(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return register;
    }()
  }]);
  return GoogleController;
}();

exports.default = GoogleController;