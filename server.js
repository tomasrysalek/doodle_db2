import express from 'express';
import connect from './config/db'; 


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

app.listen(port, () => {
    console.log(`Woohooooo`)
});

