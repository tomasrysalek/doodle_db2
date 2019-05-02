import express from 'express';
import User from './uzivatel.model';
import JWT from 'jsonwebtoken';
import passport from 'passport';
import passConf from '../../../config/passport'
import userService from './uzivatel.service';

const router = express.Router();


//Registrace ENDPOINT
router.post('/signup',userService.signup);
//Prihlaseni ENDPOINT
router.post('/login',userService.login);


/** 
* Spravit !!!
*/
router.route('/secret').get(passport.authenticate('jwt',{session: false}),()=>{
    console.log('no idea')
});
export default router;
