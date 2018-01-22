import express from 'express';

const router = express.Router();
import { mailController } from '../controllers';

// router.post('/sent-forgot-pass-code', mail.getVeriCodeForgotPassword);
// router.post('/change-password', mail.changePassword);
// router.post('/check-forgot-code', mail.checkForgotPassVeriCode);
router.post('/sent-register-email', (req, res) => {
  mailController.sentRegistrationVerif(req, res);
});

module.exports = router;
