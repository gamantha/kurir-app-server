const express = require('express');

const router = express.Router();
const item = require('../controllers/item');

router.post('/create', item.create);
router.put('/custom-address/:itemId/', item.itemHasCustomPickupAddress);

module.exports = router;
