// This is where we create our jwt strategy
const passportJwt = require('passport-jwt');

const JwtStrategy = passportJwt.Strategy,
    ExtractJwt = passportJwt.ExtractJwt,
    mongoose = require('mongoose'),
    User = mongoose.model('users'), // The users should be the same string passed in models/User.js
    keys = require('../config/keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // Function from passport-jwt
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        // console.log("HI!!!!!!!!!!!!!!!!!!");
        // console.log(jwt_payload);
        // Get user being sent in the token
        User.findById(jwt_payload.id) // jwt_payload is an object that has the user id in it (remember console logging this)
            .then(user =>{
                if (user){ // If user is found, return done function passed in from JwtStrategy
                    return done(null, user); // 1st param is error. Null since there is none. 2nd param is actual user
                }
                return done(null, false); // No user, so return false
            })
            .catch(err => console.log(err))

    }))
}

