import express from 'express';
import skupinaService from './skupina.service';
import passport from 'passport';
const router = express.Router();

//Vytvor skupinu
router.post('/create',passport.authenticate('jwt',{session:false}),skupinaService.create);
//Pridej noveho clena skupiny
router.post('/adduser',skupinaService.adduser);
router.get('/getsk',passport.authenticate('jwt',{session:false}),skupinaService.getAll);
export default router;