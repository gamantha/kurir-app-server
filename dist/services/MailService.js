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

var _email = require('../helpers/email');

var _BaseService2 = require('./BaseService');

var _BaseService3 = _interopRequireDefault(_BaseService2);

var _randToken = require('rand-token');

var _randToken2 = _interopRequireDefault(_randToken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _mailgunJs = require('mailgun-js');

var _mailgunJs2 = _interopRequireDefault(_mailgunJs);

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
    username: 'postgres',
    password: '12345',
    database: 'kurir_test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  },
  domain: {
    base_url: 'https://kurirbackend-dev.herokuapp.com'
  }
};

// import { buildEmailValidationUri } from '../helpers/constants';

// import axios from 'axios';

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
        html = (0, _email.simpleTemplate)(payload, 'Don\'t share this code with anyone.');
        subject = 'Your verification code for Kurir.id forgot password';
      }
      if (template === 'welcome') {
        html = (0, _email.advTemplate)('Curious?', 'How Kurir.id works', 'Thank you! You had successfully activate your email. Now you can use our service. Wondering why you will be happy using Kurir.id? You can take a look at our detailed information by clicking the link below.', payload, 'https://s3-ap-southeast-1.amazonaws.com/kurir-assets/thumbsup.gif');
        // '<h1>Your email has been verified! Thank your for being awesome and being part of Kurir.id</h1>';
        subject = 'Welcome to Kurir.id';
      }
      if (template === 'link') {
        html = (0, _email.advTemplate)('Activate', 'Welcome to Kurir.id!', 'We pleased and happy to be able to giving you an easy and cheap service for your package and courier needs. We want you to have the best experience for using Kurir.id, so please activate your account by clicking the button below. <i>Note: this link will expire in 1 hour</i>', payload, 'https://s3-ap-southeast-1.amazonaws.com/kurir-assets/welcome.gif');
        subject = 'Email Verification for new user';
      }
      if (template === 'change-password') {
        html = '<div>This email inform you that you have successfully change your password.\n       Here are your new password: <b>' + payload + '</b>\n       Please keep it in safe place. </div>';
        subject = 'Change password information';
      }
      if (template === 'reactivate-account') {
        html = 'Please reactivate your account by clicking on this link <u>' + payload + '</u>';
        subject = 'Reactivate account';
      }
      if (template === 'again') {
        html = (0, _email.simpleTemplate)('Your new email verification link', payload);
        subject = 'Your new email verification link';
      }
      if (template === 'stillWaitingCourier') {
        html = (0, _email.mediumTemplate)('Package Status Updated', 'Thank you for sending your item with Kurir.id! Please keep the ticket number of this package: <strong> ' + payload + '.</strong> The status of this package is: <strong>still waiting for a courier to pick it up.</strong> You will receive another update soon.', 'https://s3-ap-southeast-1.amazonaws.com/kurir-assets/email-status.png');
        subject = 'Package status for ' + payload;
      }
      if (template === 'pickedByCourier') {
        html = (0, _email.mediumTemplate)('Package Status Updated', 'We inform you that the package status with ticket number of ' + payload + ' is: <strong>Has been picked up by a courier.</strong> You will receive another update soon.', 'https://s3-ap-southeast-1.amazonaws.com/kurir-assets/email-status.png');
        subject = 'Package status for ' + payload;
      }
      if (template === 'startDroppoint') {
        html = (0, _email.mediumTemplate)('Package Status Updated', 'We inform you that the package status with ticket number of ' + payload + ' is: <strong>Arrived at origin airport droppoint.</strong> You will receive another update soon.', 'https://s3-ap-southeast-1.amazonaws.com/kurir-assets/email-status.png');
        subject = 'Package status for ' + payload;
      }
      if (template === 'onTravel') {
        html = (0, _email.mediumTemplate)('Package Status Updated', 'We inform you that the package status with ticket number of ' + payload + ' is: <strong>On the way to arrival airport droppoint.</strong> You will receive another update soon.', 'https://s3-ap-southeast-1.amazonaws.com/kurir-assets/email-status.png');
        subject = 'Package status for ' + payload;
      }
      if (template === 'endDroppoint') {
        html = (0, _email.mediumTemplate)('Package Status Updated', 'We inform you that the package status with ticket number of ' + payload + ' is: <strong>Arrived at destination airport droppoint.</strong> You will receive another update soon.', 'https://s3-ap-southeast-1.amazonaws.com/kurir-assets/email-status.png');
        subject = 'Package status for ' + payload;
      }
      if (template === 'ontheway') {
        html = (0, _email.mediumTemplate)('Package Status Updated', 'We inform you that the package status with ticket number of ' + payload + ' is: <strong>On the way to receiver address.</strong> You will receive another update soon.', 'https://s3-ap-southeast-1.amazonaws.com/kurir-assets/email-status.png');
        subject = 'Package status for ' + payload;
      }
      if (template === 'received') {
        html = (0, _email.mediumTemplate)('Package Status Updated', 'We inform you that the package status with ticket number of ' + payload + ' is: <strong>Package successfully received by the receiver.</strong> You will receive another update soon.', 'https://s3-ap-southeast-1.amazonaws.com/kurir-assets/email-status.png');
        subject = 'Package status for ' + payload;
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
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(token) {
        var result;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                result = _jsonwebtoken2.default.verify(token, process.env.SECRET).email;
                return _context2.abrupt('return', result);

              case 5:
                _context2.prev = 5;
                _context2.t0 = _context2['catch'](0);
                return _context2.abrupt('return', _context2.t0.message);

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 5]]);
      }));

      function decodeToken(_x2) {
        return _ref2.apply(this, arguments);
      }

      return decodeToken;
    }()

    /**
     * Check whether email is valid or not using mailgun services.
     *
     * @param  {String}  email
     * @return {Boolean}
     */

  }, {
    key: 'checkEmail',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(email) {
        var userEmail, updateValidEmail, welcomeMessage;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.findOne({ email: email });

              case 3:
                userEmail = _context3.sent;

                if (userEmail.dataValues.isEmailValidated) {
                  _context3.next = 16;
                  break;
                }

                _context3.next = 7;
                return this.update({ isEmailValidated: true }, { email: email });

              case 7:
                updateValidEmail = _context3.sent;

                if (!updateValidEmail) {
                  _context3.next = 13;
                  break;
                }

                welcomeMessage = this.setMailgunTemplate(email, 'welcome', config.domain.base_url + '/article/how-kuririd-works/');
                _context3.next = 12;
                return this.sendMailgunEmail(welcomeMessage);

              case 12:
                return _context3.abrupt('return', true);

              case 13:
                return _context3.abrupt('return', false);

              case 16:
                return _context3.abrupt('return', false);

              case 17:
                _context3.next = 22;
                break;

              case 19:
                _context3.prev = 19;
                _context3.t0 = _context3['catch'](0);
                return _context3.abrupt('return', false);

              case 22:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 19]]);
      }));

      function checkEmail(_x3) {
        return _ref3.apply(this, arguments);
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
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(email) {
        var tokenifyEmail, userEmail, verificationLink, verificationMessage;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                tokenifyEmail = _jsonwebtoken2.default.sign({ email: email }, process.env.SECRET, {
                  expiresIn: '1h',
                  issuer: 'kurir-id-backend',
                  subject: 'email-validation'
                });
                _context4.next = 3;
                return this.findOne({ email: email });

              case 3:
                userEmail = _context4.sent;

                if (!(userEmail && !userEmail.dataValues.isEmailValidated)) {
                  _context4.next = 12;
                  break;
                }

                verificationLink = config.domain.base_url + '/api/mail/registration/check/' + tokenifyEmail;
                verificationMessage = this.setMailgunTemplate(email, 'link', verificationLink);
                _context4.next = 9;
                return this.sendMailgunEmail(verificationMessage);

              case 9:
                return _context4.abrupt('return', true);

              case 12:
                return _context4.abrupt('return', false);

              case 13:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function sendRegisValidationLink(_x4) {
        return _ref4.apply(this, arguments);
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
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(email) {
        var token, userEmail, verificationLink, verificationMessage;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                token = _jsonwebtoken2.default.sign({ email: email }, process.env.SECRET, {
                  expiresIn: '1h',
                  issuer: 'courier.id-backend',
                  jwtid: 'courier.user',
                  subject: 'reactivate-account'
                });
                _context5.prev = 1;
                _context5.next = 4;
                return this.findOne({ email: email });

              case 4:
                userEmail = _context5.sent;

                if (!userEmail) {
                  _context5.next = 19;
                  break;
                }

                verificationLink = config.domain.base_url + '/api/mail/tokens/' + token;
                verificationMessage = this.setMailgunTemplate(email, 'reactivate-account', verificationLink);
                _context5.prev = 8;
                _context5.next = 11;
                return this.sendMailgunEmail(verificationMessage);

              case 11:
                return _context5.abrupt('return', true);

              case 14:
                _context5.prev = 14;
                _context5.t0 = _context5['catch'](8);
                throw Error(_context5.t0);

              case 17:
                _context5.next = 20;
                break;

              case 19:
                return _context5.abrupt('return', false);

              case 20:
                _context5.next = 25;
                break;

              case 22:
                _context5.prev = 22;
                _context5.t1 = _context5['catch'](1);
                throw Error(_context5.t1);

              case 25:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 22], [8, 14]]);
      }));

      function sendReactivateAccountLink(_x5) {
        return _ref5.apply(this, arguments);
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
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(email) {
        var userEmail, verificationCode, updatedEmail, verifCodeMsg;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.findOne({ email: email });

              case 2:
                userEmail = _context6.sent;

                if (!userEmail) {
                  _context6.next = 14;
                  break;
                }

                verificationCode = this.verificationCodeGenerator();
                _context6.next = 7;
                return this.update({ forgotPassVeriCode: verificationCode }, { email: email });

              case 7:
                updatedEmail = _context6.sent;

                if (!updatedEmail) {
                  _context6.next = 13;
                  break;
                }

                verifCodeMsg = this.setMailgunTemplate(email, 'code', verificationCode);
                _context6.next = 12;
                return this.sendMailgunEmail(verifCodeMsg);

              case 12:
                return _context6.abrupt('return', true);

              case 13:
                return _context6.abrupt('return', false);

              case 14:
                return _context6.abrupt('return', false);

              case 15:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function sendVerificationCode(_x6) {
        return _ref6.apply(this, arguments);
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
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(email, password) {
        var saltRounds, hash, userEmail, updatedPassword, passwordUpdatedMessage;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                saltRounds = 10;
                hash = _bcrypt2.default.hashSync(password, saltRounds);
                _context7.next = 4;
                return this.findOne({ email: email });

              case 4:
                userEmail = _context7.sent;

                if (!userEmail) {
                  _context7.next = 15;
                  break;
                }

                _context7.next = 8;
                return this.update({ password: hash }, { email: email });

              case 8:
                updatedPassword = _context7.sent;

                if (!updatedPassword) {
                  _context7.next = 14;
                  break;
                }

                passwordUpdatedMessage = this.setMailgunTemplate(email, 'change-password', password);
                _context7.next = 13;
                return this.sendMailgunEmail(passwordUpdatedMessage);

              case 13:
                return _context7.abrupt('return', true);

              case 14:
                return _context7.abrupt('return', false);

              case 15:
                return _context7.abrupt('return', false);

              case 16:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function changePassword(_x7, _x8) {
        return _ref7.apply(this, arguments);
      }

      return changePassword;
    }()

    /**
     * Send email on item status update.
     *
     * @param  {Object} senderEmail, ticketNumber
     * @param  {String} type
     * @return {Boolean}
     */

  }, {
    key: 'onUpdateItemStatus',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(payload, type) {
        var message;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                message = this.setMailgunTemplate(payload.senderEmail, type, payload.ticketNumber);
                _context8.next = 4;
                return this.sendMailgunEmail(message);

              case 4:
                return _context8.abrupt('return', true);

              case 7:
                _context8.prev = 7;
                _context8.t0 = _context8['catch'](0);
                throw Error(_context8.t0.message);

              case 10:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 7]]);
      }));

      function onUpdateItemStatus(_x9, _x10) {
        return _ref8.apply(this, arguments);
      }

      return onUpdateItemStatus;
    }()

    /**
     * Send an email verification again to registered user.
     *
     * @param  {String}  email
     * @return {Boolean}
     */

  }, {
    key: 'sendRegisValidationLinkAgain',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(email) {
        var tokenifyEmail, userEmail, verificationLink, verificationMessage;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                tokenifyEmail = _jsonwebtoken2.default.sign({ email: email }, process.env.SECRET, {
                  expiresIn: '1h',
                  issuer: 'kurir-id-backend',
                  subject: 'email-validation'
                });
                _context9.next = 3;
                return this.findOne({ email: email });

              case 3:
                userEmail = _context9.sent;

                if (!(userEmail && !userEmail.dataValues.isEmailValidated)) {
                  _context9.next = 12;
                  break;
                }

                verificationLink = config.domain.base_url + '/api/mail/registration/check/' + tokenifyEmail;
                verificationMessage = this.setMailgunTemplate(email, 'again', verificationLink);
                _context9.next = 9;
                return this.sendMailgunEmail(verificationMessage);

              case 9:
                return _context9.abrupt('return', true);

              case 12:
                return _context9.abrupt('return', false);

              case 13:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function sendRegisValidationLinkAgain(_x11) {
        return _ref9.apply(this, arguments);
      }

      return sendRegisValidationLinkAgain;
    }()
  }]);
  return MailService;
}(_BaseService3.default);

exports.default = MailService;