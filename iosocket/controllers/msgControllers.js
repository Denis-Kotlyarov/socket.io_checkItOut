const { init, User, Todo, Message } = require('../models/init');
const { Op } = require('sequelize');

class MsgController {
    async getMessages(req, res) {
        try {
            const items = await Message.findAll({
                where: {
                    UserId: {
                        [Op.or]: [req.body.UserId, req.body.ToId]
                    },
                    ToId: {
                        [Op.or]: [req.body.UserId, req.body.ToId]
                    },
                },
                order: ['created_at']
            });
    
            //Это правильная обертка?
            return res.send(items);
        } catch (error) {
            console.error(error.name);
            return res.send('MISS');
        }
    }

    async pushMessage(req, res) {
        try {
            await Message.create({
                body: req.body.body,
                UserId: req.body.UserId,
                ToId: req.body.ToId,
            });
    
            return res.sendStatus(201);
        } catch (error) {
            console.error(error);
            return res.send('Ошибка');
            //throw error;
        }
    }
}

module.exports = MsgController;