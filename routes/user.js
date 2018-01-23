import express from 'express';
import passport from 'passport';
import { userController } from '../controllers';

const router = express.Router();

router.get('/', (req, res) => {
  userController.get(req, res);
});

router.post('/create', (req, res) => {
  userController.create(req, res);
});

router.post('/check-forgot-password-verif-code', (req, res) => {
  userController.checkForgotPassVeriCode(req, res);
});

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    const { user } = req;
    res.json(user);
  }
);

module.exports = router;
