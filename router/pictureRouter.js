const express = require('express')
const pictureController = require('../controllers/pictureController')
const router = express.Router();

router.post('/', pictureController.picture_create_post);
router.get('/create', pictureController.picture_create_get);
module.exports = router;
  