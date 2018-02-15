'use strict';

var express = require('express');

var router = express.Router();
var item = require('../controllers/item');

router.post('/create', item.create);
router.put('/custom-address/:itemId/', item.itemHasCustomPickupAddress);

module.exports = router;