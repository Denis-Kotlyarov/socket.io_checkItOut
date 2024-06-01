const express = require('express');
const router = express.Router();
const { init, User, Todo } = require('../models/init');
const UsersController = new (require('../controllers/userControllers'));

/* GET users listing. */
router.get('/', UsersController.getAll);

router.post('/', UsersController.pushUser);
router.post('/email', UsersController.findByEmail);
router.post('/password', UsersController.hashPassword);

router.put('/:id', UsersController.updateUser);

router.delete('/:id', UsersController.deleteUser);

module.exports = router;