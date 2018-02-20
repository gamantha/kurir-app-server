'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

var _Auth = require('../helpers/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

var _SysAdmin = require('../helpers/SysAdmin');

var _SysAdmin2 = _interopRequireDefault(_SysAdmin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', _Auth2.default, function (req, res) {
  _controllers.proposalController.proposeToCourier(req, res);
});

router.put('/', _SysAdmin2.default, function (req, res) {
  _controllers.proposalController.updateSenderProposal(req, res);
});

router.get('/', _SysAdmin2.default, function (req, res) {
  _controllers.proposalController.getSenderProposals(req, res);
});

module.exports = router;