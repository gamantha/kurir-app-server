'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.proposalController = exports.mailController = exports.receiverController = exports.facebookController = exports.googleController = exports.userController = undefined;

var _UserController = require('./UserController');

var _UserController2 = _interopRequireDefault(_UserController);

var _ReceiverController = require('./ReceiverController');

var _ReceiverController2 = _interopRequireDefault(_ReceiverController);

var _MailController = require('./MailController');

var _MailController2 = _interopRequireDefault(_MailController);

var _GoogleController = require('./GoogleController');

var _GoogleController2 = _interopRequireDefault(_GoogleController);

var _FacebookController = require('./FacebookController');

var _FacebookController2 = _interopRequireDefault(_FacebookController);

var _ProposalController = require('./ProposalController');

var _ProposalController2 = _interopRequireDefault(_ProposalController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Controller singleton initialization
 */
var userController = exports.userController = new _UserController2.default();
var googleController = exports.googleController = new _GoogleController2.default();
var facebookController = exports.facebookController = new _FacebookController2.default();
var receiverController = exports.receiverController = new _ReceiverController2.default();
var mailController = exports.mailController = new _MailController2.default();
var proposalController = exports.proposalController = new _ProposalController2.default();