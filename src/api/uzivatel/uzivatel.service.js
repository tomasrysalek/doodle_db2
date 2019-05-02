import JWT from 'jsonwebtoken';
import User from './uzivatel.model'

function signin(req,res) {

}



function signup (req,res){
    const user = User.findOne({where:{Email: req.body.email}}).then(user =>{
        if(user){
            return res.json({message: 'user already exists'})
        }
        else{
            const newUser = User.build({ //Vytvoreni noveho uzivatel
                Email: req.body.email, 
                Heslo: req.body.psswd
            })
            .save() //Ulozit do databaze
        
            //Generovani tokenu
            const token = signToken(newUser);
            //Odeslani tokenu clientovi
            return res.status(200).json({token:token, message: 'user created'});
        }

    })
} 

export default signup;