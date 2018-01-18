import express from 'express';
import { receiverController } from '../controllers';
import Auth from '../helpers/Auth';

const router = express.Router();

router.use(Auth);

router.get('/', (req, res) => {
  receiverController.get(req, res);
});

router.get('/:id', (req, res) => {
  receiverController.find(req, res);
});

router.post('/', (req, res) => {
  receiverController.create(req, res);
});

router.delete('/:id', (req, res) => {
  receiverController.destroy(req, res);
});

router.put('/:id', (req, res) => {
  receiverController.update(req, res);
});

module.exports = router;
