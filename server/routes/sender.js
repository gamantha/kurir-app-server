const express = require('express');

const router = express.Router();
const sender = require('../controllers/sender');

router.post('/create', sender.create);

module.exports = router;
