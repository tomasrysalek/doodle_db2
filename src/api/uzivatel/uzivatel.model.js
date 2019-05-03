import connect from '../../../config/db';
import Sequelize from 'sequelize';
import bcrypt from 'bcryptjs';

const User = connect.define('user',{
    Email:{
        type: Sequelize.STRING(50),
        allowNull:false
    },
    /**
     * Vyresit hashovani hesla!!!!!
     */
    Heslo:{
        type: Sequelize.STRING(250),
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
    tableName:'Uzivatel',
    /**
     * Pred ulozenim uzivatele do databaze hashovat heslo
     */
    hooks:{
        beforeSave: async (user,options,next) => {
            try {
                //Generovani SALT
                const salt = await bcrypt.genSalt(10);
                //Generovani hashovaneho hesla
                const hashed = await bcrypt.hash(user.Heslo,salt);
                //Ulozeni hashovaneho hesla
                user.Heslo = hashed;
                next();
            }catch(err){
                //next(err)
            }
        }
    }
});


export default User;