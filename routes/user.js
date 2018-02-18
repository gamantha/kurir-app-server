import express from 'express';
import { userController } from '../controllers';
import Auth from '../helpers/Auth';
import SysAdmin from '../helpers/SysAdmin';

const router = express.Router();

router.get('/', SysAdmin, (req, res) => {
  userController.get(req, res);
});

router.post('/create', (req, res) => {
  userController.create(req, res);
});

router.post('/check-forgot-password-verif-code', (req, res) => {
  userController.checkForgotPassVeriCode(req, res);
});

router.post('/login', (req, res) => {
  userController.login(req, res);
});

router.post('/refreshtoken', Auth, (req, res) => {
  userController.refreshToken(req, res);
});

router.post('/logout', Auth, (req, res) => {
  userController.logout(req, res);
});

router.post('/change-password', Auth, (req, res) => {
  userController.changePassword(req, res);
});

router.post('/forgot-password', (req, res) => {
  userController.forgotPassword(req, res);
});

router.delete('/deactivate', Auth, (req, res) => {
  userController.deactivate(req, res);
});

router.post('/reactivate', (req, res) => {
  userController.reactivate(req, res);
});

router.post('/upload-img', Auth, (req, res) => {
  userController.uploadImg(req, res);
});

router.get('/confirmreactivation', (req, res) => {
  userController.confirmReactivation(req, res);
});

router.post('/check-token', (req, res) => {
  userController.checkToken(req, res);
});

module.exports = router;
