import connect from '../../../config/db';
import Sequelize from 'sequelize';
import Uzivatel from '../uzivatel/uzivatel.model'
const udalost = connect.define('udalost',{
    UdalostID:{
        type: Sequelize.INTEGER,
        //Primarni klic
        primaryKey: true,
        autoIncrement: true,
        //Pouze unikatni hodnoty
        unique:true,
        //Nedovoli vlozit nulovou hodnotu
        allowNull: false
    },
    Datum:{
        type: Sequelize.DATE
    },
    Nazev:{
        type: Sequelize.STRING(50)
    },
    Popis:{
        type: Sequelize.STRING(120)
    },
    Upozorneni:{
        type: Sequelize.BOOLEAN
    },
    UzivatelID:{
        type: Sequelize.INTEGER,
        //Vytvareni ciziho klice
        references:{
            //Tabulka
            model:Uzivatel,
            //Sloupec
            key:'UzivatelID'
        }
    },
    SkupinaID:{
        type: Sequelize.INTEGER,
        references:{
            model:Skupina,
            key:'SkupinaID'
        }
    },
    TypupozorneniID:{
        type: Sequelize.INTEGER,
        references:{
            model: Typupozorneni,
            key: 'TypupozorneniID'
        }
    },
    PSC:{
        type: Sequelize.STRING(6),
        references:{
            model:Adresa,
            key:'PSC'
        }
    }
},{
    freezeTableName:true,
    timestamps:false,
    tableName:'Udalost',
});
export default udalost;