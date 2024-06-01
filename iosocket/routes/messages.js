const express = require('express');
const router = express.Router();
const MsgController = new (require('../controllers/msgControllers'));

/* GET users listing. */
router.post('/all', MsgController.getMessages);

router.post('/push', MsgController.pushMessage);

module.exports = router;