import express from 'express';

const app = express();
const port = process.env.PORT || 4433;

app.listen(port, () => {
    console.log(`Listeneing on port ${port}`)
});

app.get('/test',(req,res)=>{
    res.send({express:'Wooohooooo'});
});