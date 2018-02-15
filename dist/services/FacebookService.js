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

var _fb = require('fb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FacebookService = function () {
  function FacebookService() {
    (0, _classCallCheck3.default)(this, FacebookService);

    this.clientId = process.env.FACEBOOK_AUTH_CLIENT_ID;
    this.client = new _fb.Facebook();
  }

  /**
   * Verify facebook token identity.
   * @param {String} token
   */


  (0, _createClass3.default)(FacebookService, [{
    key: 'verifyToken',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(token) {
        var result;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.client.setAccessToken(token);
                _context.prev = 1;
                _context.next = 4;
                return this.client.api('/me', { fields: 'email' });

              case 4:
                result = _context.sent;
                return _context.abrupt('return', result);

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](1);
                throw Error(_context.t0);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 8]]);
      }));

      function verifyToken(_x) {
        return _ref.apply(this, arguments);
      }

      return verifyToken;
    }()
  }]);
  return FacebookService;
}();

exports.default = FacebookService;