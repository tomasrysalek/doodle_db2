import passport from 'passport';
import User from '../src/api/uzivatel/uzivatel.model'
import localStrategy from 'passport-local'
import secret from './secret.json'
const ExtractJwt  = require('passport-jwt').ExtractJwt
const JwtStrategy = require('passport-jwt').Strategy


async function validPass(user,psswd){
    try{
        return await bcrypt.compare(psswd,user.Heslo);
     }catch(err){
         throw new Error(err);
     }
}

/**
 * Finally Working
 */
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //'authorization' nazev header pri dotazu 
    secretOrKey: `${secret.secret}`,
},async (payLoad,done) => {
    try{
        const user = User.findOne({where:{Email: payLoad.sub}}).then(foundUser =>{
            if(!foundUser){
                return done(null,false)
            }
            done(null,foundUser);
        });
    }catch(error){
        done(error,false);
    }
}))

//Local Strategy
passport.use(new localStrategy({
    usernameField: 'Email'
}, async(email,password,done)=>{
    try{
        const user = User.findOne({where: {Email: email}}).then( async foundUser => {
            
        if(!foundUser){
            return done(null,false);
        }
        
        const match = await validPass(foundUser,password);
    
        if(!match){
            return done(null,false);
        }
        else{
            return foundUser;
            // done(null,user);
        }
        });

    }
    catch(err){
        done(err,false);
    }
}
))