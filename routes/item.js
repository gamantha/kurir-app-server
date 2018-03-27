import express from 'express';
import { itemController } from '../controllers';
import Auth from '../helpers/Auth';

const router = express.Router();

router.use(Auth);

router.get('/', (req, res) => {
  itemController.get(req, res);
});

router.post('/current_trip', (req, res) => {
  itemController.get_current_trip(req, res);
});

router.get('/history', (req, res) => {
  itemController.get_history(req, res);
});

router.get('/:id', (req, res) => {
  itemController.find(req, res);
});

router.put('/:id/reserve', (req, res) => {
  itemController.reserve(req, res);
});

router.post('/', (req, res) => {
  itemController.create(req, res);
});

router.delete('/:id', (req, res) => {
  itemController.destroy(req, res);
});

router.put('/:id', (req, res) => {
  itemController.update(req, res);
});

module.exports = router;
