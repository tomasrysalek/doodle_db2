import express from 'express';
import passport from 'passport';
import passConf from '../../../config/passport';
import udalostService from './udalost.service';

const router = express.Router();

router.post('/add',passport.authenticate('jwt',{session:false}),udalostService.add);
router.get('/all',passport.authenticate('jwt',{session:false}),udalostService.getAll);
export default router;