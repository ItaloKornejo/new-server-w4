const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JSW = require('../../config').api.jwtSecret;

const { findUserById } = require('../users/users.controllers');

const options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: JSW// WORD SECRET ENV
}

passport.use(
    new JwtStrategy(options,async (tokenDecoded,done)=>{
        try{
            const user = findUserById(tokenDecoded.id)
            if(user){
                return done(null,tokenDecoded)
            } else{
                return done(null,false)
            }
        }catch(error){
            return done(error,false)
        }
    }) 
)

module.exports = passport;