import connect from '../../../config/db';
import Sequelize from 'sequelize';

const prava = connect.define('prava',{
    Nazev:{
        type:Sequelize.STRING(20)
    },
    IDPrava:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
},{
    freezeTableName:true,
    timestamps:false,
    tableName:'Prava',
});

export default prava;