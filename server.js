import express from 'express';
import connect from './config/db'; 
import userRouter from './src/api/uzivatel/uzivatel.controller';
import bodyParser from 'body-parser';
import cors from 'cors';
import skupinaRouter from './src/api/skupina/skupina.controller';
import udalostRouter from './src/api/udalost/udalost.controller';
const app = express();
const port = process.env.PORT || 4433;

connect
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
  app.use(cors());
  app.use(bodyParser.json());
  app.use('/udalost',udalostRouter);
  app.use('/user', userRouter);
  app.use('/skupina',skupinaRouter);

app.listen(port, () => {
    console.log(`Woohooooo`)
});


