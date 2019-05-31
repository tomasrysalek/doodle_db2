import connect from '../../../config/db';
import Sequelize from 'sequelize';

const Chat = connect.define('chat',{
    Message:{
        type: Sequelize.STRING(250),
        allowNull: false
    },
    Skupina:{
        type: Sequelize.STRING(250),
        allowNull: false
    },
    Uzivatel:{
        type: Sequelize.STRING(250),
        allowNull: false
    }
},{
    freezeTableName:true,
    timestamps:false,
    tableName:'Chat',
});

export default Chat;