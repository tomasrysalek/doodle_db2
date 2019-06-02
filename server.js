import express from 'express';
import connect from './config/db'; 
import userRouter from './src/api/uzivatel/uzivatel.controller';
import bodyParser from 'body-parser';
import cors from 'cors';
import skupinaRouter from './src/api/skupina/skupina.controller';
import udalostRouter from './src/api/udalost/udalost.controller';
import chat from './src/api/chat/chat.service'
import sk from './src/api/skupina/skupina.model'
import skus from './src/api/skupina_prava/sk_prava.model'
import user from './src/api/uzivatel/uzivatel.model'
import skupina from './src/api/skupina/skupina.model';
const app = express();
const port = process.env.PORT || 4433;
//const firebase = require("firebase/app");



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
  const skID = []
  const users = []
  skupina.findOne({where:{Nazev: req.query.room},raw: true}).then(foundsk =>{
    skus.findAll({where:{SkupinaID:foundsk.SkupinaID},raw: true}).then(foundIDs =>{
      for(var i = 0; i < foundIDs.length; i++){
        skID.push(foundIDs[i].UzivatelID)
    }
      user.findAll({where:{UzivatelID:skID},raw: true}).then(foundusers =>{
        foundusers.forEach(element => {
          users.push(element.Username)
        });
        res.render('index',{room: req.query.room,users:users})
      })
    })
  })
  io.on('connection',(socket) => {

    socket.removeAllListeners()
    socket.join(req.query.room) 
    /**
     * Zatím nefunguje, zobrazení historie zpráv
     */
    // Chat.findAll({where: {Skupina: req.query.room},raw:true}).then(allMessage => {
    //   allMessage.forEach(element => {
    //     io.to(req.query.room).emit('new_message', {message : element.Message, username : element.Uzivatel});
    //   });
    // })

    //Set username
    socket.username = req.query.name
  
    //listen on new_message
    socket.on('new_message', (data) => {
      //broadcast the new message
      io.to(req.query.room).emit('new_message', {message : data.message, username : socket.username});
      //Ulozeni zpravy do databaze
      // chat.save(data.message,socket.username,req.query.room)
    })

      //listen on typing
      socket.on('typing', (data) => {
        socket.to(req.query.room).broadcast.emit('typing', {username : socket.username})
      })
  })
})



