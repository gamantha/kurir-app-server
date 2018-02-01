import express from 'express';

const router = express.Router();
import { mailController } from '../controllers';

router.get('/check-email-is-valid/', (req, res) => {
  mailController.checkEmail(req, res);
});

router.post('/send-register-validation-link', (req, res) => {
  mailController.sendRegisValidationLink(req, res);
});

router.post('/send-forgot-password-verif-code', (req, res) => {
  mailController.sendForgotPassVerifCode(req, res);
});

router.post('/change-password', (req, res) => {
  mailController.changePassword(req, res);
});

module.exports = router;
