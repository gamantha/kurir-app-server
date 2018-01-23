import express from 'express';

const router = express.Router();
import { mailController } from '../controllers';

// router.post('/sent-forgot-pass-code', mail.getVeriCodeForgotPassword);
// router.post('/change-password', mail.changePassword);
// router.post('/check-forgot-code', mail.checkForgotPassVeriCode);

router.get('/check-email-is-valid/', (req, res) => {
  mailController.checkEmail(req, res);
});

router.post('/send-register-validation-link', (req, res) => {
  mailController.sendRegisValidationLink(req, res);
});

router.post('/send-forgot-password-verif-code', (req, res) => {
  mailController.sendForgotPassVerifCode(req, res);
});

module.exports = router;
