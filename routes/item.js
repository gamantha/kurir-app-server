import express from 'express';
import { itemController } from '../controllers';
import Auth from '../helpers/Auth';

const router = express.Router();

router.use(Auth);

router.get('/', (req, res) => {
  itemController.get(req, res);
});

router.get('/:id', (req, res) => {
  itemController.find(req, res);
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
