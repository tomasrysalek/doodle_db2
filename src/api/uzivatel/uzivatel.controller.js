import express from 'express';
import User from './uzivatel.model';
import JWT from 'jsonwebtoken';
import secret from '../../../config/secret.json'
import passport from 'passport';
import passConf from '../../../config/passport'
import userService from './uzivatel.service';
const router = express.Router();


function signToken (user) {
    return JWT.sign({
        iss: 'doodle',
        sub: user.UzivatelID, // Podle ceho se bude rozpoznavat
        iat: new Date().getDate(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, `${secret.secret}`);
}
/**
 * Funkcni nesahat !!!!
 */

router.post('/signup',(req,res)=>{
    const user = User.findOne({where:{Email: req.body.email}}).then(user =>{
        if(user){
            return res.json({message: 'user already exists'})
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
            res.status(200).json({token:token, message: 'user created'});
        }

    })
} 
);


/**
 * Spravit !!!
 */
router.route('/secret').get(passport.authenticate('jwt',{session: false}),()=>{
    console.log('no idea')
});

export default router;
