const { init, User, Todo } = require('../models/init');
const crypto = require('crypto');

class UsersController {
    async getAll(req, res) {
        try {
            const items = await User.findAll({
                include: Todo
            });
    
            //Это правильная обертка?
            const data = {status: 200, data: items}
            return res.send(data);
        } catch (error) {
            console.error(error);
            //throw error;
        }
    }

    async pushUser(req, res) {
        try {
            const password = crypto.createHash('sha256').update(req.body.password).digest('hex');
    
            const user = await User.create({
                first_name: req.body.first_name === '' ? null : req.body.first_name, 
                last_name: req.body.last_name === '' ? null : req.body.last_name, 
                email: req.body.email === '' ? null : req.body.email,
                password: req.body.password === '' ? null : password
            });
    
            return res.sendStatus(201);
        } catch (error) {
            console.error(error);
            return res.send('Ошибка');
            //throw error;
        }
    }

    async updateUser(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    id: req.params.id
                }
            });
    
            if (req.body.first_name !== '') user.first_name = req.body.first_name;
            if (req.body.last_name !== '') user.last_name = req.body.last_name;
            if (req.body.email !== '') user.email = req.body.email;
            if (req.body.password !== '') {
                const password = crypto.createHash('sha256').update(req.body.password).digest('hex');
                user.password = password;
            };
    
            user.save();
    
            return res.sendStatus(200);
        } catch (error) {
            console.error(error);
            return res.send('Ошибка');
            //throw error;
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
    
            if (user !== null) {
                user.destroy();
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

    async findByEmail(req, res) {
        try {
            const user = await User.findOne({ where: { email: req.body.email } });
            
            if (user !== null) {
                return res.send(user);
            } else {
                return res.send(null)
            }
        } catch (error) {
            console.error(error);
            return res.send('Ошибка');
        }
    }

    async hashPassword(req, res) {
        try {
            const hashPassword = crypto.createHash('sha256').update(req.body.password).digest('hex');
            return res.send(hashPassword)
        } catch (error) {
            console.error(error);
            return res.send('Ошибка');
        }
    }
}

module.exports = UsersController;