import connect from '../../../config/db';
import Sequelize from 'sequelize';

const skupina = connect.define('skupina',{
    Nazev:{
        type: Sequelize.STRING(50)
    },
    SKupinaID:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    }
},{
    freezeTableName:true,
    timestamps:false,
    tableName:'Skupina'
});

export default skupina;
