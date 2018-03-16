import express from 'express';
import { airportController } from '../controllers';
import Auth from '../helpers/Auth';

const router = express.Router();

router.use(Auth);

router.get('/', (req, res) => {
  airportController.get(req, res);
});

router.get('/:id', (req, res) => {
  airportController.find(req, res);
});

module.exports = router;
