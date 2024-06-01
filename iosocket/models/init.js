const User = require('./User');
const Todo = require('./Todo');
const Message = require('./Message');

User.hasMany(Todo);
User.hasMany(Message);
Todo.belongsTo(User);
Message.belongsTo(User);

const init = async () => {
    //Synchronizahen
    await User.sync({
        //Parameters - принудительно обновить, перезаписать таблицу
        alter: false,
        force: false
    });
    //Synchronizahen
    await Todo.sync({
        //Parameters - принудительно обновить, перезаписать таблицу
        alter: false,
        force: false
    });
    await Message.sync({
        //Parameters - принудительно обновить, перезаписать таблицу
        alter: false,
        force: false
    });
}

module.exports = { init, User, Todo, Message };