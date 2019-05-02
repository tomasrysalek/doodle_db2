import JWT from 'jsonwebtoken';
import User from './uzivatel.model';
import secret from '../../../config/secret.json';
import bcrypt from 'bcryptjs'

/**
 * Kontrola hashovaneho hesla pri prihlaseni
*/
async function validPass(user,psswd){
    try{
        return await bcrypt.compare(psswd,user.Heslo);
     }catch(err){
         throw new Error(err);
     }
}

function signToken (user) {
    return JWT.sign({
        iss: 'doodle',
        sub: user.UzivatelID, // Podle ceho se bude rozpoznavat
        iat: new Date().getDate(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, `${secret.secret}`);
}

//Registrace service
function signup (req,res,err){
    const user = User.findOne({where:{Email: req.body.email}}).then(user =>{
        if(user){
            return res.json({message: 'email already exists'})
        }
        else{
            const newUser = User.build({ //Vytvoreni noveho uzivatel
                Email: req.body.email, 
                Heslo: req.body.psswd
            })
            .save() //Ulozit do databaze
            
            //Generovani tokenu
            const token = signToken(newUser);
            //Odeslani tokenu clientovi
            return res.status(200).json({token:token, message: 'user created'});
        }

    })
} 
/**
 * Login service
 * !!CANT POST!!
 * !!OPRAVIT!!
 */
async function login (req,res,err,done){
    const user = User.findOne({where:{Email: req.body.email}})
    try{
        if(!user){
            return done(null,false)
        }

        const psswdMatch = await validPass(user,req.body.psswd)

        if(!psswdMatch){
            return done(null,false);
        }
        else{
            return user;
        }
    }
    catch(err){
        done(err,false);
    }
}

export default {signup,login};