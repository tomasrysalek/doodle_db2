import passport from 'passport';
import User from '../src/api/uzivatel/uzivatel.model'
import localStrategy from 'passport-local'
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
 * Spravit !!!!
 */
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'), //'authorization' nazev header pri dotazu 
    secretOrKey: 'doodle_auth',
},async(payLoad,done) => {
    try{
        const user = User.findByPk(payLoad.sub);
        if(!user){
            console.log('not found')
            return done(null,false);
        }
        done(null,user)
    }catch(error){
        console.log('ooops')
        done(error,false);
    }
}))

//Local Strategy
passport.use(new localStrategy({
    usernameField: 'Email'
}, async(email,password,done)=>{
    try{
        const user = User.findOne({where: {Email: email}});

        if(!user){
            return done(null,false);
        }
        
        const match = await validPass(user,password);
    
        if(!match){
            return done(null,false);
        }
        else{
            return user;
            // done(null,user);
        }
    }
    catch(err){
        done(err,false);
    }
}
))