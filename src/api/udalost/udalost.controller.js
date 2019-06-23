import express from 'express';
import passport from 'passport';
import passConf from '../../../config/passport';
import udalostService from './udalost.service';
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./uploads')
    },
    filename: (req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload = multer({storage: storage})
const router = express.Router();

router.post('/add',passport.authenticate('jwt',{session:false}),udalostService.add);
router.get('/all',passport.authenticate('jwt',{session:false}),udalostService.getAll);
router.post('/export',udalostService.expotToGoogle)
export default router;