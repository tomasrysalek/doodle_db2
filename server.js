import express from 'express';
import connect from './config/db'; 
import userRouter from './src/api/uzivatel/uzivatel.controller';
import bodyParser from 'body-parser';

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

  app.use(bodyParser.json());
  app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`Woohooooo`)
});


