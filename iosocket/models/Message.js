const sequelize = require("../DB");
const { DataTypes } = require("sequelize");
const User = require('./User');

const Message = sequelize.define('Message', {
    //Atributes
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
    ToId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    }
}, {
    //Other data
    tableName: 'messages',
    timestamps: false,
});

module.exports = Message;