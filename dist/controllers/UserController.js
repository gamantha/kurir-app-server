'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _helpers = require('../helpers');

var _helpers2 = _interopRequireDefault(_helpers);

var _ResponseBuilder = require('../helpers/ResponseBuilder');

var _ResponseBuilder2 = _interopRequireDefault(_ResponseBuilder);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _index = require('../services/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserController = function () {
  /**
   * User controller class
   */
  function UserController() {
    (0, _classCallCheck3.default)(this, UserController);

    this.service = new _index.UserService();
    this.senderService = new _index.SenderService();
    this.tokenService = new _index.TokenService();
    this.mailService = new _index.MailService();
    this.droppointService = new _index.DroppointService();
    this.S3Service = new _index.S3Service();
  }

  // TODO: dont get user that has role sysadmin


  (0, _createClass3.default)(UserController, [{
    key: 'get',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var response;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.service.findAll();

              case 3:
                response = _context.sent;

                res.status(200).json(new _ResponseBuilder2.default().setData(response).build());
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context.t0).setSuccess(false).build());

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function get(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: 'create',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var _req$body, email, password, username, role, authorization, saltRounds, hash, payload, response, uniqueEmail, uniqueUsername, validation, token, parsed, siteadminPayload, senderPayload;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body = req.body, email = _req$body.email, password = _req$body.password, username = _req$body.username, role = _req$body.role;
                authorization = req.headers.authorization;

                if (!password || password === '') {
                  res.status(400).json(new _ResponseBuilder2.default().setMessage('password cannot be blank or not provided').setSuccess(false).build());
                }
                saltRounds = 10;
                hash = _bcrypt2.default.hashSync(password, saltRounds);
                payload = {
                  email: email,
                  password: hash,
                  username: username,
                  role: role
                };
                response = null;
                uniqueEmail = null;
                uniqueUsername = null;
                validation = false;
                _context2.prev = 10;
                _context2.next = 13;
                return this.service.findOne({
                  email: email
                });

              case 13:
                uniqueEmail = _context2.sent;
                _context2.next = 16;
                return this.service.findOne({
                  username: username
                });

              case 16:
                uniqueUsername = _context2.sent;

                if (!(uniqueEmail === null && uniqueUsername == null)) {
                  _context2.next = 21;
                  break;
                }

                validation = true;
                _context2.next = 29;
                break;

              case 21:
                if (!uniqueEmail) {
                  _context2.next = 26;
                  break;
                }

                res.status(400).json(new _ResponseBuilder2.default().setMessage('Oops. Looks we already have this email registered.').setSuccess(false).build());
                return _context2.abrupt('return');

              case 26:
                if (!uniqueUsername) {
                  _context2.next = 29;
                  break;
                }

                res.status(400).json(new _ResponseBuilder2.default().setMessage('Oops. Username already exist. Please choose another.').setSuccess(false).build());
                return _context2.abrupt('return');

              case 29:
                _context2.next = 35;
                break;

              case 31:
                _context2.prev = 31;
                _context2.t0 = _context2['catch'](10);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context2.t0.message).setSuccess(false).build());
                return _context2.abrupt('return');

              case 35:
                if (!(role !== 'sysadmin' && role !== 'siteadmin' && role !== 'sender')) {
                  _context2.next = 40;
                  break;
                }

                res.status(417).json(new _ResponseBuilder2.default().setMessage('role must one of sysadmin,siteadmin or sender').setSuccess(false).build());
                return _context2.abrupt('return');

              case 40:
                if (!(role === 'sysadmin' && validation)) {
                  _context2.next = 54;
                  break;
                }

                _context2.prev = 41;
                _context2.next = 44;
                return this.service.create(payload);

              case 44:
                response = _context2.sent;

                res.status(201).json(new _ResponseBuilder2.default().setData(response).setMessage('successfully created new system admin').build());
                _context2.next = 52;
                break;

              case 48:
                _context2.prev = 48;
                _context2.t1 = _context2['catch'](41);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context2.t1.message).setSuccess(false).build());
                return _context2.abrupt('return');

              case 52:
                _context2.next = 97;
                break;

              case 54:
                if (!(role === 'siteadmin' && validation)) {
                  _context2.next = 81;
                  break;
                }

                if (!(!authorization || authorization === '')) {
                  _context2.next = 58;
                  break;
                }

                // Auth token not provided
                res.status(403).json(new _ResponseBuilder2.default().setMessage('Authorization header not provided or empty.').setSuccess(false).build());
                return _context2.abrupt('return');

              case 58:
                token = _helpers2.default.parseToken(authorization);
                parsed = _helpers2.default.verifyJwt(token);

                if (!(parsed.role === 'sysadmin')) {
                  _context2.next = 77;
                  break;
                }

                _context2.prev = 61;
                _context2.next = 64;
                return this.service.create(payload);

              case 64:
                response = _context2.sent;
                siteadminPayload = {
                  userId: response.id
                };
                // tambah payload lain yg dibutuhkan model droppoint

                _context2.next = 68;
                return this.droppointService.create(siteadminPayload);

              case 68:
                res.status(201).json(new _ResponseBuilder2.default().setData(response).setMessage('successfully created new site admin').build());
                _context2.next = 75;
                break;

              case 71:
                _context2.prev = 71;
                _context2.t2 = _context2['catch'](61);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context2.t2.message).setSuccess(false).build());
                return _context2.abrupt('return');

              case 75:
                _context2.next = 79;
                break;

              case 77:
                res.status(400).json(new _ResponseBuilder2.default().setMessage('only sysadmin can create site admin').setSuccess(false).build());
                return _context2.abrupt('return');

              case 79:
                _context2.next = 97;
                break;

              case 81:
                _context2.prev = 81;
                _context2.next = 84;
                return this.service.create(payload);

              case 84:
                response = _context2.sent;
                senderPayload = {
                  UserId: response.id
                };
                _context2.next = 88;
                return this.senderService.create(senderPayload);

              case 88:
                _context2.next = 90;
                return this.mailService.sendRegisValidationLink(email);

              case 90:
                res.status(201).json(new _ResponseBuilder2.default().setData(response).setMessage('successfully created new sender').build());
                _context2.next = 97;
                break;

              case 93:
                _context2.prev = 93;
                _context2.t3 = _context2['catch'](81);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context2.t3.message).setSuccess(false).build());
                return _context2.abrupt('return');

              case 97:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[10, 31], [41, 48], [61, 71], [81, 93]]);
      }));

      function create(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: 'confirmReactivation',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        var token, result;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                token = req.query.token;

                if (!(typeof token === 'undefined')) {
                  _context3.next = 5;
                  break;
                }

                res.status(422).json(new _ResponseBuilder2.default().setMessage('invalid payload').setSuccess(false).build());
                _context3.next = 20;
                break;

              case 5:
                _context3.prev = 5;
                _context3.next = 8;
                return this.service.confirmReactivation(token);

              case 8:
                result = _context3.sent;

                if (!(result === true)) {
                  _context3.next = 13;
                  break;
                }

                res.status(200).json(new _ResponseBuilder2.default().setMessage('Your account has been successfully reactivated').build());
                _context3.next = 15;
                break;

              case 13:
                res.status(400).json(new _ResponseBuilder2.default().setMessage('Fail to reactivate your email').setSuccess(false).build());
                return _context3.abrupt('return');

              case 15:
                _context3.next = 20;
                break;

              case 17:
                _context3.prev = 17;
                _context3.t0 = _context3['catch'](5);

                res.status(400).json(new _ResponseBuilder2.default().setMessage('token invalid').setSuccess(false).build());

              case 20:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[5, 17]]);
      }));

      function confirmReactivation(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return confirmReactivation;
    }()
  }, {
    key: 'reactivate',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
        var email, result;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                email = req.body.email;

                if (!(typeof email !== 'undefined')) {
                  _context4.next = 18;
                  break;
                }

                _context4.prev = 2;
                _context4.next = 5;
                return this.mailService.sendReactivateAccountLink(email);

              case 5:
                result = _context4.sent;

                if (!(result == false)) {
                  _context4.next = 9;
                  break;
                }

                res.status(404).json(new _ResponseBuilder2.default().setMessage('invalid email').setSuccess(false).build());
                return _context4.abrupt('return');

              case 9:
                res.status(200).json(new _ResponseBuilder2.default().setMessage('Reactivation email sent, please check your email.').build());
                return _context4.abrupt('return');

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4['catch'](2);

                res.status(400).json(new _ResponseBuilder2.default().setMessage('Fail to send reactivation email.').setSuccess(false).build());

              case 16:
                _context4.next = 19;
                break;

              case 18:
                res.status(422).json(new _ResponseBuilder2.default().setMessage('Invalid payload').setSuccess(false).build());

              case 19:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 13]]);
      }));

      function reactivate(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return reactivate;
    }()
  }, {
    key: 'login',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
        var _req$body2, username, password, Op, user, userData, token, accessToken, _user, _userData, _token, _accessToken;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;

                if (!(username && password)) {
                  _context5.next = 69;
                  break;
                }

                Op = _sequelize2.default.Op;
                // find with username or email

                _context5.prev = 3;
                _context5.next = 6;
                return this.service.findOne((0, _defineProperty3.default)({}, Op.or, [{
                  email: username
                }, {
                  username: username
                }]), [{ model: _models2.default.Sender }]);

              case 6:
                user = _context5.sent;

                if (!(user === null)) {
                  _context5.next = 10;
                  break;
                }

                res.status(404).json(new _ResponseBuilder2.default().setMessage('username or email not found').setSuccess(false).build());
                return _context5.abrupt('return');

              case 10:
                if (!_bcrypt2.default.compareSync(password, user.password)) {
                  _context5.next = 27;
                  break;
                }

                userData = Object.assign({
                  email: user.email,
                  id: user.id,
                  role: user.role,
                  senderId: user.Sender.id
                });
                token = _helpers2.default.createJWT(userData);
                _context5.prev = 13;
                _context5.next = 16;
                return this.tokenService.saveToken(token, req.headers['user-agent']);

              case 16:
                accessToken = _context5.sent;

                res.status(200).json(new _ResponseBuilder2.default().setData(accessToken).setMessage('Logged in successfully').build());
                return _context5.abrupt('return');

              case 21:
                _context5.prev = 21;
                _context5.t0 = _context5['catch'](13);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context5.t0.message).setSuccess(false).build());
                return _context5.abrupt('return');

              case 25:
                _context5.next = 29;
                break;

              case 27:
                res.status(200).json(new _ResponseBuilder2.default().setMessage('Invalid password').setSuccess(false).build());
                return _context5.abrupt('return');

              case 29:
                _context5.next = 69;
                break;

              case 31:
                _context5.prev = 31;
                _context5.t1 = _context5['catch'](3);

                if (!(_context5.t1.message === 'Cannot read property \'id\' of null')) {
                  _context5.next = 68;
                  break;
                }

                _context5.prev = 34;
                _context5.next = 37;
                return this.service.findOne((0, _defineProperty3.default)({}, Op.or, [{
                  email: username
                }, {
                  username: username
                }]));

              case 37:
                _user = _context5.sent;

                if (!(_user === null)) {
                  _context5.next = 41;
                  break;
                }

                res.status(404).json(new _ResponseBuilder2.default().setMessage('username or email not found').setSuccess(false).build());
                return _context5.abrupt('return');

              case 41:
                if (!_bcrypt2.default.compareSync(password, _user.password)) {
                  _context5.next = 58;
                  break;
                }

                _userData = Object.assign({
                  email: _user.email,
                  id: _user.id,
                  role: _user.role
                });
                _token = _helpers2.default.createJWT(_userData);
                _context5.prev = 44;
                _context5.next = 47;
                return this.tokenService.saveToken(_token, req.headers['user-agent']);

              case 47:
                _accessToken = _context5.sent;

                res.status(200).json(new _ResponseBuilder2.default().setData(_accessToken).setMessage('Logged in successfully').build());
                return _context5.abrupt('return');

              case 52:
                _context5.prev = 52;
                _context5.t2 = _context5['catch'](44);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context5.t2.message).setSuccess(false).build());
                return _context5.abrupt('return');

              case 56:
                _context5.next = 60;
                break;

              case 58:
                res.status(200).json(new _ResponseBuilder2.default().setMessage('Invalid password').setSuccess(false).build());
                return _context5.abrupt('return');

              case 60:
                _context5.next = 66;
                break;

              case 62:
                _context5.prev = 62;
                _context5.t3 = _context5['catch'](34);

                res.status(404).json(new _ResponseBuilder2.default().setMessage(_context5.t3.message).setSuccess(false).build());
                return _context5.abrupt('return');

              case 66:
                _context5.next = 69;
                break;

              case 68:
                res.status(404).json(new _ResponseBuilder2.default().setMessage('error at login').setSuccess(false).build());

              case 69:
                res.status(400).json(new _ResponseBuilder2.default().setMessage('invalid payload').setSuccess(false).build());
                return _context5.abrupt('return');

              case 71:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[3, 31], [13, 21], [34, 62], [44, 52]]);
      }));

      function login(_x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: 'refreshToken',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
        var refreshToken, response;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                refreshToken = req.body.refreshToken;

                if (refreshToken) {
                  _context6.next = 4;
                  break;
                }

                res.status(400).json(new _ResponseBuilder2.default().setMessage('invalid payload').setSuccess(false).build());
                return _context6.abrupt('return');

              case 4:
                _context6.prev = 4;
                _context6.next = 7;
                return this.tokenService.refreshToken(req.headers.authorization, refreshToken, req.headers['user-agent']);

              case 7:
                response = _context6.sent;

                res.status(200).json(new _ResponseBuilder2.default().setData(response).setMessage('Access token successfully refreshed.').build());
                return _context6.abrupt('return');

              case 12:
                _context6.prev = 12;
                _context6.t0 = _context6['catch'](4);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context6.t0.message).setSuccess(false).build());
                return _context6.abrupt('return');

              case 16:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[4, 12]]);
      }));

      function refreshToken(_x11, _x12) {
        return _ref6.apply(this, arguments);
      }

      return refreshToken;
    }()
  }, {
    key: 'logout',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
        var token;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                token = _helpers2.default.parseToken(req.headers['authorization']);
                _context7.next = 4;
                return this.tokenService.destroy({
                  accessToken: token
                });

              case 4:
                res.status(200).json(new _ResponseBuilder2.default().setData({}).build());
                _context7.next = 10;
                break;

              case 7:
                _context7.prev = 7;
                _context7.t0 = _context7['catch'](0);

                res.status(404).json(new _ResponseBuilder2.default().setMessage(_context7.t0.message).setSuccess(false).build());

              case 10:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 7]]);
      }));

      function logout(_x13, _x14) {
        return _ref7.apply(this, arguments);
      }

      return logout;
    }()
  }, {
    key: 'checkForgotCode',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, res) {
        var _req$body3, email, veriCode, response;

        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _req$body3 = req.body, email = _req$body3.email, veriCode = _req$body3.veriCode;
                _context8.prev = 1;
                _context8.next = 4;
                return this.service.findOne({
                  email: email
                });

              case 4:
                response = _context8.sent;

                if (!(response === null)) {
                  _context8.next = 8;
                  break;
                }

                res.status(404).json(new _ResponseBuilder2.default().setSuccess(false).setMessage('User not found').build());
                return _context8.abrupt('return');

              case 8:
                if (!(response.forgotPassVeriCode === veriCode)) {
                  _context8.next = 20;
                  break;
                }

                _context8.prev = 9;
                _context8.next = 12;
                return this.service.update({ forgotPassVeriCode: null }, { email: email });

              case 12:
                res.status(200).json(new _ResponseBuilder2.default().setMessage('Verification code match. User now can safely reset password.').build());
                _context8.next = 18;
                break;

              case 15:
                _context8.prev = 15;
                _context8.t0 = _context8['catch'](9);

                res.status(400).json(new _ResponseBuilder2.default().setMessage('There is a problem with our server please try again later').setSuccess(false).build());

              case 18:
                _context8.next = 21;
                break;

              case 20:
                res.status(400).json(new _ResponseBuilder2.default().setMessage('Verification code didn\'t match').setSuccess(false).build());

              case 21:
                _context8.next = 26;
                break;

              case 23:
                _context8.prev = 23;
                _context8.t1 = _context8['catch'](1);

                res.status(400).json(new _ResponseBuilder2.default().setMessage('There is a problem with our server please try again later').setSuccess(false).build());

              case 26:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this, [[1, 23], [9, 15]]);
      }));

      function checkForgotCode(_x15, _x16) {
        return _ref8.apply(this, arguments);
      }

      return checkForgotCode;
    }()
  }, {
    key: 'sendForgotCode',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(req, res) {
        var email, result, response;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                email = req.body.email;
                _context9.next = 3;
                return this.mailService.sendVerificationCode(email);

              case 3:
                result = _context9.sent;
                response = result ? [200, 'Successfully sent verification code forgot password to email', true] : [422, (email ? email : 'email') + ' is not registered!', false];


                res.status(response[0]).json(new _ResponseBuilder2.default().setMessage(response[1]).setSuccess(response[2]).build());

              case 6:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function sendForgotCode(_x17, _x18) {
        return _ref9.apply(this, arguments);
      }

      return sendForgotCode;
    }()
  }, {
    key: 'changePassword',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(req, res) {
        var forgotpassword, _req$body4, old_password, new_password, email, user, oldPass, result, _result;

        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                forgotpassword = req.query.forgotpassword;
                _req$body4 = req.body, old_password = _req$body4.old_password, new_password = _req$body4.new_password;
                email = res.locals.user.email;
                _context10.prev = 3;

                if (!(forgotpassword === 'false')) {
                  _context10.next = 19;
                  break;
                }

                _context10.next = 7;
                return this.service.findOne({ email: email });

              case 7:
                user = _context10.sent;
                oldPass = _bcrypt2.default.compareSync(old_password, user.dataValues.password);
                // if oldPass same with in db

                if (!oldPass) {
                  _context10.next = 16;
                  break;
                }

                _context10.next = 12;
                return this.service.changePassword(email, new_password, forgotpassword);

              case 12:
                result = _context10.sent;

                if (result) {
                  res.status(200).json(new _ResponseBuilder2.default().setMessage('password successfully changed').build());
                }
                _context10.next = 17;
                break;

              case 16:
                res.status(401).json(new _ResponseBuilder2.default().setMessage('Wrong old password').setSuccess(false).build());

              case 17:
                _context10.next = 27;
                break;

              case 19:
                if (!(forgotpassword === 'true')) {
                  _context10.next = 26;
                  break;
                }

                _context10.next = 22;
                return this.service.changePassword(email, new_password, forgotpassword);

              case 22:
                _result = _context10.sent;

                if (_result) {
                  res.status(200).json(new _ResponseBuilder2.default().setMessage('password successfully changed').build());
                }
                _context10.next = 27;
                break;

              case 26:
                res.status(400).json(new _ResponseBuilder2.default().setMessage('forgot password params value is invalid').setSuccess(false).build());

              case 27:
                _context10.next = 32;
                break;

              case 29:
                _context10.prev = 29;
                _context10.t0 = _context10['catch'](3);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context10.t0.message).setSuccess(false).build());

              case 32:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this, [[3, 29]]);
      }));

      function changePassword(_x19, _x20) {
        return _ref10.apply(this, arguments);
      }

      return changePassword;
    }()
  }, {
    key: 'deactivate',
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(req, res) {
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                _context11.next = 3;
                return this.service.update({ deletedAt: new Date() }, { email: res.locals.user.email });

              case 3:
                res.status(200).json(new _ResponseBuilder2.default().setMessage('User deactivated').setSuccess(true).build());
                _context11.next = 9;
                break;

              case 6:
                _context11.prev = 6;
                _context11.t0 = _context11['catch'](0);

                res.status(400).json(new _ResponseBuilder2.default().setMessage('error occured').setSuccess(false).build());

              case 9:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this, [[0, 6]]);
      }));

      function deactivate(_x21, _x22) {
        return _ref11.apply(this, arguments);
      }

      return deactivate;
    }()
  }, {
    key: 'uploadImg',
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(req, res) {
        var _req$body5, base64, type, extension, buf, encodeEmail, link, imgPayload;

        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                // convert image to base64 from mobile client
                /**
                 * send image to S3
                 * @param {string} base64
                 * @param {string} type of upload (ID,Photo)
                 * @param {string} extension jpg, png, etc.
                 */
                // base64 format: data:image/${extension};base64,${base64}
                _req$body5 = req.body, base64 = _req$body5.base64, type = _req$body5.type, extension = _req$body5.extension;

                if (!(type !== 'ID' && type !== 'Photo')) {
                  _context12.next = 5;
                  break;
                }

                res.status(400).json(new _ResponseBuilder2.default().setMessage('type only ID or Photo').setSuccess(false).build());
                _context12.next = 32;
                break;

              case 5:
                _context12.prev = 5;

                // const base64 = await this.S3Service.convertToBase64(
                //   'assets/ktp-test.jpg'
                // );
                buf = new Buffer(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                encodeEmail = encodeURIComponent(res.locals.user.email);
                link = 'https://s3-ap-southeast-1.amazonaws.com/kurir-backend/' + encodeEmail + '/' + encodeEmail + '-' + type + '.' + extension;
                imgPayload = {
                  Bucket: 'kurir-backend/' + res.locals.user.email,
                  Key: res.locals.user.email + '-' + type + '.' + extension,
                  Body: buf,
                  ACL: 'public-read'
                };
                _context12.prev = 10;
                _context12.next = 13;
                return this.S3Service.client.upload(imgPayload, function (err, data) {
                  return data;
                });

              case 13:
                if (!(type === 'ID')) {
                  _context12.next = 18;
                  break;
                }

                _context12.next = 16;
                return this.service.proposeModel.update({
                  idLink: link
                }, {
                  where: {
                    UserId: res.locals.user.id
                  }
                });

              case 16:
                _context12.next = 21;
                break;

              case 18:
                if (!(type === 'Photo')) {
                  _context12.next = 21;
                  break;
                }

                _context12.next = 21;
                return this.service.proposeModel.update({
                  photoLink: link
                }, {
                  where: {
                    UserId: res.locals.user.id
                  }
                });

              case 21:
                res.status(200).json(new _ResponseBuilder2.default().setMessage('successfully upload image to S3').setSuccess(true).build());
                _context12.next = 27;
                break;

              case 24:
                _context12.prev = 24;
                _context12.t0 = _context12['catch'](10);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context12.t0.message).setSuccess(false).build());

              case 27:
                _context12.next = 32;
                break;

              case 29:
                _context12.prev = 29;
                _context12.t1 = _context12['catch'](5);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context12.t1.message).setSuccess(false).build());

              case 32:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this, [[5, 29], [10, 24]]);
      }));

      function uploadImg(_x23, _x24) {
        return _ref12.apply(this, arguments);
      }

      return uploadImg;
    }()
  }, {
    key: 'checkToken',
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(req, res) {
        var token, result;
        return _regenerator2.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                token = req.body.token;
                _context13.prev = 1;
                _context13.next = 4;
                return _helpers2.default.verifyJwt(token);

              case 4:
                result = _context13.sent;

                res.status(200).json(new _ResponseBuilder2.default().setData(result).setMessage('token still valid').setSuccess(true).build());
                _context13.next = 11;
                break;

              case 8:
                _context13.prev = 8;
                _context13.t0 = _context13['catch'](1);

                res.status(400).json(new _ResponseBuilder2.default().setMessage('invalid_token').setSuccess(false).build());

              case 11:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this, [[1, 8]]);
      }));

      function checkToken(_x25, _x26) {
        return _ref13.apply(this, arguments);
      }

      return checkToken;
    }()
  }, {
    key: 'editUserProfile',
    value: function () {
      var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(req, res) {
        var _req$body6, email, photoLink, _req$body7, name, address, phone, loggedInUser, user, sender;

        return _regenerator2.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _req$body6 = req.body, email = _req$body6.email, photoLink = _req$body6.photoLink;
                _req$body7 = req.body, name = _req$body7.name, address = _req$body7.address, phone = _req$body7.phone;
                loggedInUser = res.locals.user.id;
                _context14.prev = 3;
                _context14.next = 6;
                return this.service.update({ email: email, photoLink: photoLink }, { id: loggedInUser }, {
                  returning: true,
                  plain: true
                });

              case 6:
                user = _context14.sent;
                _context14.next = 9;
                return this.senderService.update({ name: name, address: address, phone: phone }, { UserId: loggedInUser });

              case 9:
                sender = _context14.sent;

                res.status(200).json(new _ResponseBuilder2.default().setData({ user: user, sender: sender }).setSuccess(true).build());
                _context14.next = 16;
                break;

              case 13:
                _context14.prev = 13;
                _context14.t0 = _context14['catch'](3);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context14.t0.message).setSuccess(false).build());

              case 16:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this, [[3, 13]]);
      }));

      function editUserProfile(_x27, _x28) {
        return _ref14.apply(this, arguments);
      }

      return editUserProfile;
    }()
  }]);
  return UserController;
}();

exports.default = UserController;