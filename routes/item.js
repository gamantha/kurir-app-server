import express from 'express';
import { itemController } from '../controllers';
import Auth from '../helpers/Auth';


const router = express.Router();

<<<<<<< HEAD
router.post('/create', Auth, item.create);
router.get('/', item.get);
// router.put('/custom-address/:itemId/', item.itemHasCustomPickupAddress);
=======
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
>>>>>>> aa74160a52fc4cdb2acc9bea48b3d9d28815fb1a

module.exports = router;
