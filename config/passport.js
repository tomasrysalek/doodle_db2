import passport from 'passport';
import secret from './secret.json';
import User from '../src/api/uzivatel/uzivatel.model'

const ExtractJwt  = require('passport-jwt').ExtractJwt
const JwtStrategy = require('passport-jwt').Strategy
/**
 * Spravit !!!!
 */
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: `${secret.secret}`,
    
},async(payLoad,done) => {
    try{
        const user = await User.findByPk({where: {UzivatelID: payLoad.sub}});
        if(!user){
            return done(null,false);
        }
        done(null,user)
    }catch(error){
        done(error,false);
    }
}))