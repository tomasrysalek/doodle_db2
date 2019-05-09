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
        iss: 'doodle_web_api',
        sub: user.Email, // Podle ceho se bude rozpoznavat
        exp: Math.floor(Date.now() / 1000) + (60 * 60), //Funkcni na jednu hodinu
    }, `${secret.secret}`);
}

//Registrace service
function signup (req,res){
    const user1 = User.findOne({where:{Email: req.body.email}}).then(foundUser =>{
        if(foundUser){
            return res.json({message: 'email'})
        }
        else{
            const newUser = User.build({ //Vytvoreni noveho uzivatel
                Email: req.body.email, 
                Heslo: req.body.psswd,
                Username: req.body.username
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
function login (req,res){
    const user = User.findOne({where:{Email: req.body.email}}).then(foundUser=>{
        try{
            const psswdMatch = validPass(foundUser,req.body.psswd) 
            
            if(!foundUser || !psswdMatch){
                return res.json({mssg:'Email or Password'})
            }

            else{
                const token = signToken(foundUser);
                return res.status(200).json({token:token});
            }
        }
        catch(err){
            res.json({mssg:err})
        }
    })
}

// function changeEmail(req,res){
//     User.findOne({where: {Email:req.user.UzivatelID}}).then(foundUser =>{
//         foundUser.update({
//             Email: req.body.Email
//         }).save()
//     })
// }


export default {signup,
    login};