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

var _services = require('../services');

var _ResponseBuilder = require('../helpers/ResponseBuilder');

var _ResponseBuilder2 = _interopRequireDefault(_ResponseBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MailController = function () {
  function MailController() {
    (0, _classCallCheck3.default)(this, MailController);

    this.service = new _services.MailService();
  }

  (0, _createClass3.default)(MailController, [{
    key: 'checkEmail',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var token, email, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                token = req.params.token;
                email = this.service.decodeToken(token);
                _context.next = 4;
                return this.service.checkEmail(email);

              case 4:
                result = _context.sent;

                if (!result) {
                  _context.next = 8;
                  break;
                }

                res.sendFile('confirmed.html', { root: 'views/confirmation/' });
                return _context.abrupt('return');

              case 8:
                res.sendFile('fail.html', { root: 'views/confirmation/' });
                return _context.abrupt('return');

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function checkEmail(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return checkEmail;
    }()
  }, {
    key: 'sendRegisValidationLink',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var email, result, response;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                email = req.body.email;
                _context2.next = 3;
                return this.service.sendRegisValidationLink(email);

              case 3:
                result = _context2.sent;
                response = result ? [200, 'Successfully sent verification link to ' + email] : [422, (email ? email : 'email') + ' is not valid or you already verified your email!'];


                res.status(response[0]).json(new _ResponseBuilder2.default().setMessage(response[1]).build());

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function sendRegisValidationLink(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return sendRegisValidationLink;
    }()
  }]);
  return MailController;
}();

exports.default = MailController;