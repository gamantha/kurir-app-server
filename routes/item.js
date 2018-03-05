const express = require('express');

const router = express.Router();
const item = require('../controllers/item');
import Auth from '../helpers/Auth';

router.post('/create', Auth, item.create);
router.get('/', item.get);
// router.put('/custom-address/:itemId/', item.itemHasCustomPickupAddress);

module.exports = router;
