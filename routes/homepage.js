import express from 'express';

const router = express.Router();
import { homepageController } from '../controllers';

router.get('article/how-kuririd-works/', (req, res) => {
  homepageController.sendWorksPage(req, res);
});

module.exports = router;
