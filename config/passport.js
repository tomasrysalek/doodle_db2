import passport from 'passport';
import secret from './secret.json';
import User from '../src/api/uzivatel/uzivatel.model'

const ExtractJwt  = require('passport-jwt').ExtractJwt
const JwtStrategy = require('passport-jwt').Strategy
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