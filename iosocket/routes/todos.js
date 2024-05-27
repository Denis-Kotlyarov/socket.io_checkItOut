const express = require('express');
const router = express.Router();
const { init, User, Todo } = require('../models/init');
const TodosController = new (require('../controllers/todoControllers'));

/* GET users listing. */
router.get('/', TodosController.getAll);

router.post('/', TodosController.pushTodo);

router.put('/:id', TodosController.updateTodo);

router.delete('/:id', TodosController.deleteTodo);

module.exports = router;