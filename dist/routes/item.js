'use strict';

var _Auth = require('../helpers/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');

var router = express.Router();
var item = require('../controllers/item');


router.post('/create', _Auth2.default, item.create);
// router.put('/custom-address/:itemId/', item.itemHasCustomPickupAddress);

module.exports = router;