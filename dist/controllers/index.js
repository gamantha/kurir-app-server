'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.homepageController = exports.airportController = exports.mapController = exports.itemController = exports.proposalController = exports.mailController = exports.receiverController = exports.facebookController = exports.googleController = exports.userController = undefined;

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

var _ItemController = require('./ItemController');

var _ItemController2 = _interopRequireDefault(_ItemController);

var _MapController = require('./MapController');

var _MapController2 = _interopRequireDefault(_MapController);

var _AirportController = require('./AirportController');

var _AirportController2 = _interopRequireDefault(_AirportController);

var _HomepageController = require('./HomepageController');

var _HomepageController2 = _interopRequireDefault(_HomepageController);

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
var itemController = exports.itemController = new _ItemController2.default();
var mapController = exports.mapController = new _MapController2.default();
var airportController = exports.airportController = new _AirportController2.default();
var homepageController = exports.homepageController = new _HomepageController2.default();