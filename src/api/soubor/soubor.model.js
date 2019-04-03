import connect from '../../../config/db';
import Sequelize from 'sequelize';

const soubor = connect.define('soubor',{
    SouborID:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nazev:{
        type: Sequelize.STRING(40),
        allowNull: false
    },
    Type:{
        type: Sequelize.STRING(7),
        allowNull: false
    },
    Soubor:{
        type: Sequelize.BLOB,
        allowNull: false
    },
    UdalostID:{
        type: Sequelize.INTEGER,
        references:{
            model: udalost,
            key:'UdalostID'
        }
    }
},{
    freezeTableName:true,
    timestamps:false,
    tableName:'Soubor'

});

export default soubor;