import express from 'express';
import { userController } from '../controllers';
import Auth from '../helpers/Auth';

const router = express.Router();

router.get('/', (req, res) => {
  userController.get(req, res);
});

router.post('/create', (req, res) => {
  userController.create(req, res);
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

module.exports = router;
