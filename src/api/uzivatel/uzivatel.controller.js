import express from 'express';
import User from './uzivatel.model';
import JWT from 'jsonwebtoken';
import secret from '../../../config/secret.json'
import passport from 'passport';
import passConf from '../../../config/passport'

const router = express.Router();

/**
 * Funkcni nesahat !!!!
 */
function signToken (user) {
    return JWT.sign({
        iss: 'doodle',
        sub: user.UzivatelID, // Podle ceho se bude rozpoznavat
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, `${secret.secret}`);
}
router.post('/signup',(req,res)=>{
    const user =
    User.build({ //Vytvoreni noveho uzivatel
        Email: req.body.email, 
        Heslo: req.body.psswd
    })
    .save() //Ulozit do databaze
    .then() //Pokud error tak vypsat
    .catch(error => console.error(error)
    );
    //Generovani tokenu
    const token = signToken(user);
    //Odeslani tokenu clientovi
    res.status(200).json({token:token});
});


/**
 * Spravit !!!
 */
router.route('/secret').get(passport.authenticate('jwt',{session: false}),()=>{
    console.log('no idea')
});

export default router;