import express from 'express';
import passport from 'passport';
import passConf from '../../../config/passport';
import udalostService from './udalost.service';
const multer = require('multer');
const upload = multer({dest:'./uploads/'});

const router = express.Router();

router.post('/add',passport.authenticate('jwt',{session:false}),udalostService.add);
router.get('/all',passport.authenticate('jwt',{session:false}),upload.single('file'),udalostService.getAll);
export default router;