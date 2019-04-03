import connect from '../../../config/db';
import Sequelize from 'sequelize';

const typUpozorneni = connect.define('typUpozorneni',{
    TypupozorneniID:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false
    },
    Nazev:{
        type:Sequelize.STRING(20),
        allowNull: false
    }
},{
    freezeTableName:true,
    timestamps:false,
    tableName:'Typupozorneni',
});

export default typUpozorneni;