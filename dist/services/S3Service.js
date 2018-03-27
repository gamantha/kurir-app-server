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

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _base64Img = require('base64-img');

var _base64Img2 = _interopRequireDefault(_base64Img);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S3Service = function () {
  function S3Service() {
    (0, _classCallCheck3.default)(this, S3Service);

    this.client = new _awsSdk2.default.S3({
      params: {
        Bucket: 'kurir-backend'
      },
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
  }

  (0, _createClass3.default)(S3Service, [{
    key: 'convertToBase64',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(path) {
        var result;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                result = _base64Img2.default.base64Sync(path);
                return _context.abrupt('return', result);

              case 5:
                _context.prev = 5;
                _context.t0 = _context['catch'](0);
                throw Error(_context.t0.message);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 5]]);
      }));

      function convertToBase64(_x) {
        return _ref.apply(this, arguments);
      }

      return convertToBase64;
    }()
  }]);
  return S3Service;
}();

exports.default = S3Service;