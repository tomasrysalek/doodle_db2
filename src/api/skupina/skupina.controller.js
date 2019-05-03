import express from 'express';
import skupinaService from './skupina.service';

const router = express.Router();

router.post('/add',skupinaService.add);

export default router;