const express = require('express');

const router = express.Router();
const mail = require('../controllers/mail');

router.post('/test', mail.sendTestEmail);

module.exports = router;
