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

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _BaseService2 = require('./BaseService');

var _BaseService3 = _interopRequireDefault(_BaseService2);

var _randToken = require('rand-token');

var _randToken2 = _interopRequireDefault(_randToken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _mailgunJs = require('mailgun-js');

var _mailgunJs2 = _interopRequireDefault(_mailgunJs);

var _constants = require('../helpers/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  development: {
    username: 'postgres',
    password: '12345',
    database: 'kurir_mobile',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'root',
    password: '123456',
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  },
  domain: {
    base_url: 'https://kurirbackend-dev.herokuapp.com'
  }
};

var MailService = function (_BaseService) {
  (0, _inherits3.default)(MailService, _BaseService);

  function MailService() {
    (0, _classCallCheck3.default)(this, MailService);
    return (0, _possibleConstructorReturn3.default)(this, (MailService.__proto__ || Object.getPrototypeOf(MailService)).call(this, _models2.default.User));
  }

  /**
   * Set credentials for mailgun service.
   */


  (0, _createClass3.default)(MailService, [{
    key: 'setAuth',
    value: function setAuth() {
      return (0, _mailgunJs2.default)({
        apiKey: process.env.mailgunPrivateApiKey,
        publicApiKey: process.env.mailgunPublicValidationKey,
        domain: process.env.mailgunDomain
      });
    }

    /**
     * Send the template using mailgun service
     *
     * TODO Handle if mailgun server does not process the request
     * @param  {Object} message Email template for mailgun
     * @return {Mixed}
     *
     */

  }, {
    key: 'sendMailgunEmail',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(message) {
        var mail;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                mail = this.setAuth();
                _context.prev = 1;
                _context.next = 4;
                return mail.messages().send(message);

              case 4:
                return _context.abrupt('return', _context.sent);

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](1);
                throw Error(_context.t0);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 7]]);
      }));

      function sendMailgunEmail(_x) {
        return _ref.apply(this, arguments);
      }

      return sendMailgunEmail;
    }()

    /**
     * Generate random number
     *
     * @return {Number} Random number
     */

  }, {
    key: 'verificationCodeGenerator',
    value: function verificationCodeGenerator() {
      return _randToken2.default.generator({
        source: 'math',
        chars: 'numeric'
      }).generate(6);
    }

    /**
     * Set mailgun template accordingly.
     *
     * @param {String} email    user email
     * @param {String} template will be used to determine the template
     * @param {Mixed} payload
     *
     * @return {Object}
     */

  }, {
    key: 'setMailgunTemplate',
    value: function setMailgunTemplate(email, template, payload) {
      var html = void 0,
          subject = void 0;
      if (template === 'code') {
        html = '<b>This is your verification code number. Do not share it with anyone.</b> ' + payload;
        subject = 'Your verification code for Kurir.id forgot password';
      }
      if (template === 'welcome') {
        html = '<h1>Your email has been verified! Thank your for being awesome and being part of Kurir.id</h1>';
        subject = 'Welcome to Kurir.id';
      }
      if (template === 'link') {
        html = 'Please verify your account by clicking on this link <u>' + payload + '</u>';
        subject = 'Email Verification for Newly Onboarding User';
      }
      if (template === 'change-password') {
        html = '<div>This email inform you that you have successfully change your password.\n       Here are your new password: <b>' + payload + '</b>\n       Please keep it in safe place. </div>';
        subject = 'Change password information';
      }
      if (template == 'reactivate-account') {
        html = 'Please reactivate your account by clicking on this link <u>' + payload + '</u>';
      }

      return {
        from: 'Kurir.id <noreply@kurir.id>',
        to: email,
        subject: subject,
        html: html
      };
    }
  }, {
    key: 'decodeToken',
    value: function decodeToken(token) {
      return _jsonwebtoken2.default.verify(token, process.env.SECRET).email;
    }

    /**
     * Check whether email is valid or not using mailgun services.
     *
     * @param  {String}  email
     * @return {Boolean}
     */

  }, {
    key: 'checkEmail',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(email) {
        var validateEmailUri, validEmail, updateValidEmail, welcomeMessage;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                validateEmailUri = (0, _constants.buildEmailValidationUri)(email);
                _context2.next = 3;
                return _axios2.default.get(validateEmailUri);

              case 3:
                validEmail = _context2.sent;

                if (!(validEmail && validEmail.data && validEmail.data.is_valid)) {
                  _context2.next = 14;
                  break;
                }

                _context2.next = 7;
                return this.update({ isEmailValidated: true }, { email: email });

              case 7:
                updateValidEmail = _context2.sent;

                if (!updateValidEmail) {
                  _context2.next = 13;
                  break;
                }

                welcomeMessage = this.setMailgunTemplate(email, 'welcome', null);
                _context2.next = 12;
                return this.sendMailgunEmail(welcomeMessage);

              case 12:
                return _context2.abrupt('return', true);

              case 13:
                return _context2.abrupt('return', false);

              case 14:
                return _context2.abrupt('return', false);

              case 15:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function checkEmail(_x2) {
        return _ref2.apply(this, arguments);
      }

      return checkEmail;
    }()

    /**
     * Send an email verification to registered user.
     *
     * @param  {String}  email
     * @return {Boolean}
     */

  }, {
    key: 'sendRegisValidationLink',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(email) {
        var tokenifyEmail, userEmail, verificationLink, verificationMessage;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                tokenifyEmail = _jsonwebtoken2.default.sign({ email: email }, process.env.SECRET, {
                  expiresIn: '1h',
                  issuer: 'kurir-id-backend',
                  subject: 'email-validation'
                });
                _context3.next = 3;
                return this.findOne({ email: email });

              case 3:
                userEmail = _context3.sent;

                if (!userEmail) {
                  _context3.next = 10;
                  break;
                }

                verificationLink = config.domain.base_url + '/api/mail/tokens/' + tokenifyEmail;
                verificationMessage = this.setMailgunTemplate(email, 'link', verificationLink);
                _context3.next = 9;
                return this.sendMailgunEmail(verificationMessage);

              case 9:
                return _context3.abrupt('return', true);

              case 10:
                return _context3.abrupt('return', false);

              case 11:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function sendRegisValidationLink(_x3) {
        return _ref3.apply(this, arguments);
      }

      return sendRegisValidationLink;
    }()

    /**
     * Send an email verification to registered user.
     *
     * @param  {String}  email
     * @return {Boolean}
     */

  }, {
    key: 'sendReactivateAccountLink',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(email) {
        var token, userEmail, verificationLink, verificationMessage;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                token = _jsonwebtoken2.default.sign({ email: email }, process.env.SECRET, {
                  expiresIn: '1h',
                  issuer: 'courier.id-backend',
                  jwtid: 'courier.user',
                  subject: 'reactivate-account'
                });
                _context4.prev = 1;
                _context4.next = 4;
                return this.findOne({ email: email });

              case 4:
                userEmail = _context4.sent;

                if (!userEmail) {
                  _context4.next = 19;
                  break;
                }

                verificationLink = config.domain.base_url + '/api/mail/tokens/' + token;
                verificationMessage = this.setMailgunTemplate(email, 'reactivate-account', verificationLink);
                _context4.prev = 8;
                _context4.next = 11;
                return this.sendMailgunEmail(verificationMessage);

              case 11:
                return _context4.abrupt('return', true);

              case 14:
                _context4.prev = 14;
                _context4.t0 = _context4['catch'](8);
                throw Error(_context4.t0);

              case 17:
                _context4.next = 20;
                break;

              case 19:
                return _context4.abrupt('return', false);

              case 20:
                _context4.next = 25;
                break;

              case 22:
                _context4.prev = 22;
                _context4.t1 = _context4['catch'](1);
                throw Error(_context4.t1);

              case 25:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 22], [8, 14]]);
      }));

      function sendReactivateAccountLink(_x4) {
        return _ref4.apply(this, arguments);
      }

      return sendReactivateAccountLink;
    }()

    /**
     * Send verification code to the email when user forgot the password
     *
     * @param  {String}  email [description]
     * @return {Promise}       [description]
     */

  }, {
    key: 'sendVerificationCode',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(email) {
        var userEmail, verificationCode, updatedEmail, verifCodeMsg;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.findOne({ email: email });

              case 2:
                userEmail = _context5.sent;

                if (!userEmail) {
                  _context5.next = 14;
                  break;
                }

                verificationCode = this.verificationCodeGenerator();
                _context5.next = 7;
                return this.update({ forgotPassVeriCode: verificationCode }, { email: email });

              case 7:
                updatedEmail = _context5.sent;

                if (!updatedEmail) {
                  _context5.next = 13;
                  break;
                }

                verifCodeMsg = this.setMailgunTemplate(email, 'code', verificationCode);
                _context5.next = 12;
                return this.sendMailgunEmail(verifCodeMsg);

              case 12:
                return _context5.abrupt('return', true);

              case 13:
                return _context5.abrupt('return', false);

              case 14:
                return _context5.abrupt('return', false);

              case 15:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function sendVerificationCode(_x5) {
        return _ref5.apply(this, arguments);
      }

      return sendVerificationCode;
    }()

    /**
     * Change user password.
     *
     * @param  {String}  email
     * @param  {String}  password
     * @return {Boolean}
     */

  }, {
    key: 'changePassword',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(email, password) {
        var saltRounds, hash, userEmail, updatedPassword, passwordUpdatedMessage;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                saltRounds = 10;
                hash = _bcrypt2.default.hashSync(password, saltRounds);
                _context6.next = 4;
                return this.findOne({ email: email });

              case 4:
                userEmail = _context6.sent;

                if (!userEmail) {
                  _context6.next = 15;
                  break;
                }

                _context6.next = 8;
                return this.update({ password: hash }, { email: email });

              case 8:
                updatedPassword = _context6.sent;

                if (!updatedPassword) {
                  _context6.next = 14;
                  break;
                }

                passwordUpdatedMessage = this.setMailgunTemplate(email, 'change-password', password);
                _context6.next = 13;
                return this.sendMailgunEmail(passwordUpdatedMessage);

              case 13:
                return _context6.abrupt('return', true);

              case 14:
                return _context6.abrupt('return', false);

              case 15:
                return _context6.abrupt('return', false);

              case 16:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function changePassword(_x6, _x7) {
        return _ref6.apply(this, arguments);
      }

      return changePassword;
    }()
  }]);
  return MailService;
}(_BaseService3.default);

exports.default = MailService;