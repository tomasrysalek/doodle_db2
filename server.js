import express from 'express';
import connect from './config/db'; 
import userRouter from './src/api/uzivatel/uzivatel.controller';
import bodyParser from 'body-parser';
import cors from 'cors';
import skupinaRouter from './src/api/skupina/skupina.controller';
import udalostRouter from './src/api/udalost/udalost.controller';
const app = express();
const port = process.env.PORT || 4433;
app.set('view engine','ejs')

app.use(express.static('public'));

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


const server = app.listen(port)
const io = require("socket.io")(server)

app.get('/',(req,res) => {
  console.log('room:', req.headers.room)
  console.log('name:', req.headers.name)
  // res.render('index',{room: req.body.room})
  io.on('connection',(socket) => {

    socket.removeAllListeners()
    socket.join(req.headers.room)    
    //Set username
    socket.username = req.headers.name
  
      //listen on new_message
      socket.on('new_message', (data) => {
          //broadcast the new message
          io.to(req.headers.room).emit('new_message', {message : data.message, username : socket.username});
      })

      //listen on typing
      socket.on('typing', (data) => {
        socket.to(req.headers.room).broadcast.emit('typing', {username : socket.username})
      })
  })
})



