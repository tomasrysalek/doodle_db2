import JWT from 'jsonwebtoken';
import User from './uzivatel.model'

function signin(req,res) {

}

function signUp(req,res){
    const user =
    User.build({
        Email: req.body.email, 
        Heslo: req.body.newpassword
    })
    .save()
    .then()
    .catch(error => console.error(error)
    );
    const token = JWT.sign({
        iss: 'doodle',
        sub: user.UzivatelID, // Podle ceho se bude rozpoznavat
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, 'doodle_auth');

    res.status(200).json({token: token});
}

export default signUp;