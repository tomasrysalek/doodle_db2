import connect from '../../../config/db';
import Sequelize from 'sequelize';

const user = connect.define('user',{
    Email:{
        type: Sequelize.STRING(50),
        allowNull:false
    },
    /**
     * Vyresit hashovani hesla!!!!!
     */
    Heslo:{
        type: Sequelize.STRING(50),
        allowNull:false
    },
    UzivatelID:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique:true
    }
},{
    freezeTableName:true,
    timestamps:false,
    tableName:'Uzivatel'
});

export default user;