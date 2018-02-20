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

var _googleAuthLibrary = require('google-auth-library');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GoogleService = function () {
  function GoogleService() {
    (0, _classCallCheck3.default)(this, GoogleService);

    this.clientId = process.env.GOOGLE_AUTH_CLIENT_ID;
    this.client = new _googleAuthLibrary.OAuth2Client(this.clientId, '', '');
  }

  /**
   * Verify google token identity.
   * @param {String} token
   */


  (0, _createClass3.default)(GoogleService, [{
    key: 'verifyToken',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(token) {
        var result;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.client.verifyIdToken({
                  idToken: token,
                  audiance: this.clientId
                });

              case 3:
                result = _context.sent;
                return _context.abrupt('return', result.getPayload());

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);
                throw Error(_context.t0);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function verifyToken(_x) {
        return _ref.apply(this, arguments);
      }

      return verifyToken;
    }()
  }]);
  return GoogleService;
}();

exports.default = GoogleService;