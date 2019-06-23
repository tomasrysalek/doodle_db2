import JWT from 'jsonwebtoken';
import User from './uzivatel.model';
import secret from '../../../config/secret.json';
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer';
import mailer_config from '../../../config/nodemailer.json'
const transporter = nodemailer.createTransport({
    service: `${mailer_config.service}`,
    auth:{
        user:`${mailer_config.user}`,
        pass:`${mailer_config.pass}`
    },
    tls: {
        rejectUnauthorized: false
    }
});

/**
 * Kontrola hashovaneho hesla pri prihlaseni
*/
async function validPass(user,psswd){
    try{
        const psswdMatch = await bcrypt.compare(psswd,user.Heslo);
        console.log(psswdMatch)
        return psswdMatch
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
  
            const mailOption = {
                from: 'doodle.noreply.notification@gmail.com',
                to: foundUser.Email,
                subject: 'Doodle registrace',
                html: '<h3>Vítejte do <b>Doodle</b>'+foundUser.Username+',</h3>'+ '<p>registroval jste do naší aplikace</p>'
            }
            transporter.sendMail(mailOption)

            /**
             * Generovani tokenu musi byt pred .save() po .save() se instance smaze
             */
            const token = signToken(newUser);
            //Generovani tokenu
            newUser.save()
            //Odeslani tokenu clientovi
            return res.sendStatus(200).json({token: token, message: 'user created',username:foundUser.Username,email:foundUser.Email});
        }
    })}
/**
 * Login service
 */
function login (req,res){
    User.findOne({where:{Email: req.body.email}}).then(foundUser=>{
        try{
            const pssd = req.body.psswd;
            const psswdMatch = validPass(foundUser,pssd) 
            
            if(!foundUser || !psswdMatch){
                return res.json({mssg:'Email or Password'})
            }

            else{


            const token = signToken(foundUser);
            return res.json({token:token,username:foundUser.Username,email:foundUser.Email});
            }   
        }
        catch(err){
            res.json({mssg:err})
        }
    })
}

function googleLogin(req,res){
    User.findOne({where:{Email:req.body.profileObj.email}}).then(foundUser =>{
        if(!foundUser){
            const newUser = User.build({ //Vytvoreni noveho uzivatel
                Email: req.body.profileObj.email, 
                Heslo: req.body.profileObj.googleId,
                Username: req.body.profileObj.name
            })
            const mailOption = {
                from: 'doodle.noreply.notification@gmail.com',
                to: newUser.Email,
                subject: 'Doodle registrace',
                html: '<h3>Vítejte do <b>Doodle</b>'+newUser.Username+',</h3>'+ '<p>registroval jste do naší aplikace</p>'
            }
            transporter.sendMail(mailOption)

            const token = signToken(newUser);
            //Generovani tokenu
            newUser.save()
            //Odeslani tokenu clientovi
            return res.status(200).json({token: token, email: req.body.profileObj.email,username:req.body.profileObj.name});
        }
        else{
            const token = signToken(foundUser);
            return res.json({token:token,email: foundUser.Email,username:foundUser.Username});
        }
    })
}

function changeEmail(req,res){
    User.findOne({where:{UzivatelID: req.user.UzivatelID}}).then(foundUser => {
        foundUser.Email = req.body.newEmail;
        const token = signToken(foundUser)
        foundUser.save({fields:['Email']})
        return res.json({token:token,email:foundUser.Email})
    })
}

function changePsswd(req,res){
    User.findOne({where:{UzivatelID:req.user.UzivatelID}}).then(foundUser =>{
        const psswdMatch = validPass(foundUser,req.body.oldPass) 
        if(!psswdMatch){
            return res.sendStatus(409)
        }
        else{
            foundUser.Heslo = req.body.newPass;
            const token = signToken(foundUser)
            foundUser.save({fields:['Heslo']})
            return res.json({token:token})
        }
    })
}

export default {signup,
                login,
                googleLogin,
                changeEmail,
                changePsswd};