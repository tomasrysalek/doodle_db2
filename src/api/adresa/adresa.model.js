import connect from '../../../config/db';
import Sequelize from 'sequelize';

const adresa = connect.define('adresa',{
    PSC:{
        type: Sequelize.STRING(6),
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    //Mesto
    Nazev:{
        type: Sequelize.STRING(50),
        allowNull: false
    }
},{
    freezeTableName:true,
    timestamps:false,
    tableName:'Adresa'

})

export default adresa;