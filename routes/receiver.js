const express = require('express');

const router = express.Router();
const receiver = require('../controllers/receiver');

router.post('/create', receiver.create);

module.exports = router;
