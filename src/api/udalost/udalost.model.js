import connect from '../../../config/db';
import Sequelize from 'sequelize';
import Uzivatel from '../uzivatel/uzivatel.model'
import Skupina from '../skupina/skupina.model'
import Typupozorneni from '../typupozorneni/typupozorneni.model'
import Adresa from '../adresa/adresa.model'
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
        type: Sequelize.DATE,
        defaultValue:new Date()
    },
    Nazev:{
        type: Sequelize.STRING(50)
    },
    Popis:{
        type: Sequelize.STRING(120),
        defaultValue: ''
    },
    Upozorneni:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    UzivatelID:{
        type: Sequelize.INTEGER,
        defaultValue:null,
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
        allowNull:true,
        defaultValue: null,
        references:{
            model: Typupozorneni,
            key: 'TypupozorneniID'
        }
    },
    PSC:{
        type: Sequelize.STRING(6),
        allowNull: true,
        defaultValue:null
    },
    Adresa:{
        type:Sequelize.STRING(250),
        allowNull: true,
        defaultValue:null
    }
},{
    freezeTableName:true,
    timestamps:false,
    tableName:'Udalost',
});
export default udalost;