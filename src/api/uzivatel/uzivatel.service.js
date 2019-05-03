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
        sub: user.Email, // Podle ceho se bude rozpoznavat
        exp: Math.floor(Date.now() / 1000) + (60 * 60), //Funkcni na jednu hodinu
    }, `${secret.secret}`);
}

//Registrace service
function signup (req,res){
    const user1 = User.findOne({where:{Email: req.body.email}}).then(user =>{
        if(user){
            return res.json({message: 'email'})
        }
        else{
            const newUser = User.build({ //Vytvoreni noveho uzivatel
                Email: req.body.email, 
                Heslo: req.body.psswd
            }) //Ulozit do databaze
            

            /**
             * Generovani tokenu musi byt pred .save() po .save() se instance smaze
             */
            const token = signToken(newUser);
            //Generovani tokenu
            newUser.save()
            //Odeslani tokenu clientovi
            return res.status(200).json({token: token, message: 'user created'});
        }
    })}
/**
 * Login service
 * !!CANT POST!!
 * !!OPRAVIT!!
 */
async function signin (req,res,err,done){
    const user = User.findOne({where:{Email: req.body.email}}).then(foundUser=>{
        try{
            if(!foundUser){
                return done(null,false)
            }
    
            const psswdMatch = validPass(foundUser,req.body.psswd)
    
            if(!psswdMatch){
                return done(null,false);
            }
            else{
                const token = signToken(foundUser);
                return res.json({token:token});
            }
        }
        catch(err){
            done(err,false);
        }
    })

}

function test(req,res){
    const user = User.findOne({where:{Email: req.body.email}}).then(user =>{
        const token = signToken(user.UzivatelID);
        const de = JWT.decode(token);
        console.log('token',token);
        console.log('detoken',de);
        console.log(user.UzivatelID)
    });

}

export default {signup,signin,test};