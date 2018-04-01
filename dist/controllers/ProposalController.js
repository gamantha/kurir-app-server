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

var _index = require('../services/index');

var _ResponseBuilder = require('../helpers/ResponseBuilder');

var _ResponseBuilder2 = _interopRequireDefault(_ResponseBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProposalController = function () {
  /**
   * Courier Proposal Controller
   */
  function ProposalController() {
    (0, _classCallCheck3.default)(this, ProposalController);

    this.service = new _index.CourierProposalService();
    this.userService = new _index.UserService();
  }

  (0, _createClass3.default)(ProposalController, [{
    key: 'proposeToCourier',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var _req$body, phone, bankAccount, address, checkUser, response;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, phone = _req$body.phone, bankAccount = _req$body.bankAccount, address = _req$body.address;

                if (!(typeof phone == 'undefined' || typeof bankAccount == 'undefined' || typeof address == 'undefined')) {
                  _context.next = 4;
                  break;
                }

                res.status(422).json(new _ResponseBuilder2.default().setMessage('invalid payload').setSuccess(false).build());
                return _context.abrupt('return');

              case 4:
                _context.prev = 4;
                _context.next = 7;
                return this.service.findOne({
                  // where must provided, otherwise won't work
                  UserId: res.locals.user.id
                });

              case 7:
                checkUser = _context.sent;

                if (!(checkUser === null)) {
                  _context.next = 15;
                  break;
                }

                _context.next = 11;
                return this.service.create({
                  status: 'waiting',
                  UserId: res.locals.user.id,
                  phone: phone,
                  bankAccount: bankAccount,
                  address: address,
                  proposeDate: new Date()
                });

              case 11:
                response = _context.sent;

                res.status(201).json(new _ResponseBuilder2.default().setData(response).setMessage('We\'ll be reviewing your proposal \
              and respond very soon. Thank you').setSuccess(true).build());
                // user that rejected send another request
                _context.next = 22;
                break;

              case 15:
                if (!(checkUser.status === 'rejected')) {
                  _context.next = 21;
                  break;
                }

                _context.next = 18;
                return this.service.update({
                  status: 'waiting'
                }, {
                  UserId: res.locals.user.id
                });

              case 18:
                res.status(200).json(new _ResponseBuilder2.default().setSuccess(true).setMessage('We\'ll be reviewing your proposal and \
              respond very soon. Thank you').build());
                _context.next = 22;
                break;

              case 21:
                if (checkUser.status === 'verified') {
                  res.status(401).json(new _ResponseBuilder2.default().setMessage('You already a courier').setSuccess(false).build());
                } else {
                  res.status(200).json(new _ResponseBuilder2.default().setMessage('You already submit upgrade proposal.\
              Please wait for our team to reach you.').setSuccess(false).build());
                }

              case 22:
                _context.next = 27;
                break;

              case 24:
                _context.prev = 24;
                _context.t0 = _context['catch'](4);

                res.status(400).json(new _ResponseBuilder2.default().setMessage('unknown error occured, contact our technical support.').setSuccess(false).build());

              case 27:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 24]]);
      }));

      function proposeToCourier(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return proposeToCourier;
    }()

    // sysadmin method

  }, {
    key: 'updateSenderProposal',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var _req$body2, status, UserId, rejectReason, updated, _updated, _updated2;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body2 = req.body, status = _req$body2.status, UserId = _req$body2.UserId, rejectReason = _req$body2.rejectReason;

                if (!(status === 'verified' || status === 'rejected' || status === 'waiting')) {
                  _context2.next = 28;
                  break;
                }

                _context2.prev = 2;

                if (!(status === 'verified')) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 6;
                return this.service.proposalAccepted(status, rejectReason, UserId);

              case 6:
                updated = _context2.sent;

                res.status(200).json(new _ResponseBuilder2.default().setData({ UserId: parseInt(UserId), updated: updated }).setSuccess(true).build());
                _context2.next = 21;
                break;

              case 10:
                if (!(status === 'rejected')) {
                  _context2.next = 17;
                  break;
                }

                _context2.next = 13;
                return this.service.proposalRejected(status, rejectReason, UserId);

              case 13:
                _updated = _context2.sent;

                res.status(200).json(new _ResponseBuilder2.default().setData({ UserId: parseInt(UserId), updated: _updated }).setSuccess(true).build());
                _context2.next = 21;
                break;

              case 17:
                _context2.next = 19;
                return this.service.proposalWaiting(status, rejectReason, UserId);

              case 19:
                _updated2 = _context2.sent;

                res.status(200).json(new _ResponseBuilder2.default().setData({ UserId: parseInt(UserId), updated: _updated2 }).setSuccess(true).build());

              case 21:
                _context2.next = 26;
                break;

              case 23:
                _context2.prev = 23;
                _context2.t0 = _context2['catch'](2);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context2.t0.message).setSuccess(false).build());

              case 26:
                _context2.next = 29;
                break;

              case 28:
                res.status(400).json(new _ResponseBuilder2.default().setMessage('invalid request body on status').setSuccess(false).build());

              case 29:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 23]]);
      }));

      function updateSenderProposal(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return updateSenderProposal;
    }()
  }, {
    key: 'getSenderProposals',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        var result;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.service.model.findAll({
                  include: [{
                    model: this.userService.model,
                    attributes: {
                      exclude: ['password', 'forgotPassVeriCode']
                    }
                  }]
                });

              case 3:
                result = _context3.sent;

                res.status(200).json(new _ResponseBuilder2.default().setData(result).setSuccess(true).build());
                _context3.next = 10;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3['catch'](0);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context3.t0).setSuccess(false).build());

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));

      function getSenderProposals(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return getSenderProposals;
    }()
  }]);
  return ProposalController;
}();

exports.default = ProposalController;