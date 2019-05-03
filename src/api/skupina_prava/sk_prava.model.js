import connect from '../../../config/db';
import Sequelize from 'sequelize';
import Uzivatel from './../uzivatel/uzivatel.model'
import prava from '../prava/prava.model';
import Skupina from '../skupina/skupina.model';
const sk_prava = connect.define('skupina_prava',{
    UzivatelID:{
        type: Sequelize.INTEGER,
        references:{
            model: Uzivatel,
            key: 'UzivatelID'
        }
    },
    SkupinaID:{
        type: Sequelize.INTEGER,
        references:{
            model:Skupina,
            key:'SkupinaID'
        }
    },
    ID_Prava:{
        type: Sequelize.INTEGER,
        references:{
            model:prava,
            key:'IDPrava'
        }
    },
    SU_ID:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    }
},{
    freezeTableName:true,
    timestamps:false,
    tableName:'SkupinaUzivatel',
});

export default sk_prava;