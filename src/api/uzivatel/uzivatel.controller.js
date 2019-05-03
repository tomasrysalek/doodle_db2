import express from 'express';
import passport from 'passport';
import passConf from '../../../config/passport'
import userService from './uzivatel.service';

const router = express.Router();


//Registrace ENDPOINT
router.post('/signup',userService.signup);
//Prihlaseni ENDPOINT
router.post('/signin',userService.signin);
router.post('/test',userService.test)
//Secret Endpoint pouze test pro autentifikaci pomoci JWT FUNKCNI
router.get('/secret',passport.authenticate('jwt',{session:false}),(req,res)=>{
     console.log(req.user)
})

export default router;
