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

var FacebookController = function () {
  function FacebookController() {
    (0, _classCallCheck3.default)(this, FacebookController);

    this.service = new _index.FacebookService();
    this.userService = new _index.UserService();
    this.tokenService = new _index.TokenService();
  }

  (0, _createClass3.default)(FacebookController, [{
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
                return this.service.verifyToken(tokenId);

              case 7:
                user = _context.sent;

                if ('email' in user) {
                  _context.next = 13;
                  break;
                }

                res.status(404).json(new _ResponseBuilder2.default().setSuccess(false).setMessage('Email scope is not enabled').build());
                return _context.abrupt('return');

              case 13:
                _context.prev = 13;
                _context.next = 16;
                return this.userService.findOne({ email: user.email });

              case 16:
                exist = _context.sent;

                if (!(exist !== null)) {
                  _context.next = 34;
                  break;
                }

                // return token
                userData = Object.assign({
                  email: exist.email,
                  id: exist.id
                });
                token = _helpers2.default.createJWT(userData);
                _context.prev = 20;
                _context.next = 23;
                return this.tokenService.saveToken(token, req.headers['user-agent']);

              case 23:
                accessToken = _context.sent;

                res.status(200).json(new _ResponseBuilder2.default().setData(accessToken).setMessage('Logged in successfully').build());
                return _context.abrupt('return');

              case 28:
                _context.prev = 28;
                _context.t0 = _context['catch'](20);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context.t0.message).setSuccess(false).build());
                return _context.abrupt('return');

              case 32:
                _context.next = 36;
                break;

              case 34:
                res.status(200).json(new _ResponseBuilder2.default().setData({
                  email: user.email,
                  registered: false
                }).setMessage('User information retrieved successfully').build());
                return _context.abrupt('return');

              case 36:
                _context.next = 42;
                break;

              case 38:
                _context.prev = 38;
                _context.t1 = _context['catch'](13);

                res.status(400).json(new _ResponseBuilder2.default().setSuccess(false).setMessage('An error occured while searching for you in our database.').build());
                return _context.abrupt('return');

              case 42:
                _context.next = 47;
                break;

              case 44:
                _context.prev = 44;
                _context.t2 = _context['catch'](4);

                res.status(400).json(new _ResponseBuilder2.default().setMessage('Provided tokenId is not valid').setSuccess(false).build());

              case 47:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 44], [13, 38], [20, 28]]);
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
        var tokenId, result, exist;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                tokenId = req.body.tokenId;

                if (!(typeof tokenId !== 'undefined')) {
                  _context2.next = 34;
                  break;
                }

                _context2.prev = 2;
                _context2.next = 5;
                return this.service.verifyToken(tokenId);

              case 5:
                result = _context2.sent;

                if ('email' in result) {
                  _context2.next = 11;
                  break;
                }

                res.status(404).json(new _ResponseBuilder2.default().setSuccess(false).setMessage('Email scope is not enabled').build());
                return _context2.abrupt('return');

              case 11:
                _context2.prev = 11;
                _context2.next = 14;
                return this.userService.findOne({ email: result.email });

              case 14:
                exist = _context2.sent;

                if (!(exist !== null)) {
                  _context2.next = 20;
                  break;
                }

                res.status(200).json(new _ResponseBuilder2.default().setData({
                  registered: true
                }).setMessage('You have already registered with this email, procceed to login').setSuccess(false).build());
                return _context2.abrupt('return');

              case 20:
                res.status(200).json(new _ResponseBuilder2.default().setData({
                  email: result.email,
                  registered: false
                }).setMessage('User information retrieved successfully').build());
                return _context2.abrupt('return');

              case 22:
                _context2.next = 28;
                break;

              case 24:
                _context2.prev = 24;
                _context2.t0 = _context2['catch'](11);

                res.status(400).json(new _ResponseBuilder2.default().setSuccess(false).setMessage('An error occured while searching for you in our database.').build());
                return _context2.abrupt('return');

              case 28:
                _context2.next = 34;
                break;

              case 30:
                _context2.prev = 30;
                _context2.t1 = _context2['catch'](2);

                res.status(400).json(new _ResponseBuilder2.default().setSuccess(false).setMessage('Invalid access token').build());
                return _context2.abrupt('return');

              case 34:
                res.status(403).json(new _ResponseBuilder2.default().setSuccess(false).setMessage('Invalid payload').build());

              case 35:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 30], [11, 24]]);
      }));

      function register(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return register;
    }()
  }]);
  return FacebookController;
}();

exports.default = FacebookController;