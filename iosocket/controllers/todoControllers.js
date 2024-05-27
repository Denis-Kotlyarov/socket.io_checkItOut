const { init, User, Todo } = require('../models/init');

class TodosController {
    async getAll(req, res) {
        try {
            const items = await Todo.findAll({
                // include: User
            });
    
            //Это правильная обертка?
            const data = {status: 200, data: items}
            return res.send(data);
        } catch (error) {
            console.error(error);
            return res.send('Ошибка');
            //throw error;
        }  
    }

    async pushTodo(req, res) {
        try {
            await Todo.create({
                UserId: req.body.UserId,
                title: req.body.title === '' ? null : req.body.title, 
                body: req.body.body === '' ? null : req.body.body, 
                done: false
            });
    
            return res.sendStatus(201);
        } catch (error) {
            console.error(error);
            return res.send('Ошибка');
            //throw error;
        }
    }

    async updateTodo(req, res) {
        try {
            // await User.update(
            //     { 
            //         first_name: req.body.first_name ? req.body.first_name : first_name,
            //         last_name: req.body.last_name ? req.body.last_name : last_name,
            //         email: req.body.email ? req.body.email : email,
            //     },
            //     {
            //         where: {
            //             id: req.params.id,
            //         },
            //     }
            // )
            const todo = await Todo.findOne({
                where: {
                    id: req.params.id
                }
            });
    
            if (req.body.title !== '') todo.title = req.body.title;
            if (req.body.body !== '') todo.body = req.body.body;
            if (req.body.done !== '') todo.done = req.body.done;
    
            todo.save();
    
            return res.sendStatus(200);
        } catch (error) {
            console.error(error);
            return res.send('Ошибка');
            //throw error;
        }
    }

    async deleteTodo(req, res) {
        try {
            const todo = await Todo.findByPk(req.params.id);
    
            if (todo !== null) {
                todo.destroy();
                return res.sendStatus(204);
            } else {
                return res.sendStatus(404);
            }
        } catch (error) {
            console.error(error);
            return res.send('Ошибка');
            //throw error;
        }
    }
}

module.exports = TodosController;