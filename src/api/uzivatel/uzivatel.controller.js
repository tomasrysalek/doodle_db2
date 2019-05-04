import express from 'express';
import passport from 'passport';
import passConf from '../../../config/passport'
import userService from './uzivatel.service';

const router = express.Router();


//Registrace ENDPOINT
router.post('/login',userService.login);
router.post('/signup',userService.signup);
//Prihlaseni ENDPOINT
//Secret Endpoint pouze test pro autentifikaci pomoci JWT FUNKCNI

export default router;
