'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _ResponseBuilder = require('./ResponseBuilder');

var _ResponseBuilder2 = _interopRequireDefault(_ResponseBuilder);

var _index = require('../services/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var authorization, response, token, result, tokenService, userService, findToken, user;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            authorization = req.headers.authorization;
            response = new _ResponseBuilder2.default();

            if (!(typeof authorization === 'undefined' || authorization === '')) {
              _context.next = 6;
              break;
            }

            // Auth token not provided
            response.setMessage('Authorization header not provided or empty.').setSuccess(false).build();
            res.status(403).json(response);
            return _context.abrupt('return');

          case 6:
            _context.prev = 6;
            token = _2.default.parseToken(authorization);
            result = _2.default.verifyJwt(token);
            tokenService = new _index.TokenService();
            userService = new _index.UserService();
            _context.prev = 11;
            _context.next = 14;
            return tokenService.findOne({
              accessToken: token,
              userAgent: req.headers['user-agent']
            });

          case 14:
            findToken = _context.sent;

            if (!(findToken === null)) {
              _context.next = 18;
              break;
            }

            res.status(401).json(new _ResponseBuilder2.default().setMessage('you have not logged in').setSuccess(false).build());
            return _context.abrupt('return');

          case 18:
            _context.next = 20;
            return userService.findOne({ email: result.email });

          case 20:
            user = _context.sent;

            if (!(user.role !== 'sysadmin')) {
              _context.next = 24;
              break;
            }

            res.status(401).json(new _ResponseBuilder2.default().setMessage('You are not authorized to access this page.').setSuccess(false).build());
            return _context.abrupt('return');

          case 24:
            res.locals.user = {
              email: result.email,
              id: result.id,
              role: result.role
            };
            _context.next = 30;
            break;

          case 27:
            _context.prev = 27;
            _context.t0 = _context['catch'](11);
            throw Error(_context.t0);

          case 30:
            _context.next = 36;
            break;

          case 32:
            _context.prev = 32;
            _context.t1 = _context['catch'](6);

            res.status(401).json(response.setMessage(_context.t1.message).setSuccess(false).build());
            return _context.abrupt('return');

          case 36:
            next();

          case 37:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[6, 32], [11, 27]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();