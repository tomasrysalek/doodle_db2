import express from 'express';
import passport from 'passport';
import passConf from '../../../config/passport'
import userService from './uzivatel.service';

const router = express.Router();

//ENDPOINT pro prihlaseni
router.post('/login',userService.login);
//ENDPOINT pro registrace
router.post('/signup',userService.signup);
// router.put('/chemail',passport.authenticate('jwt',{session:false}),userService.changeEmail)
export default router;
