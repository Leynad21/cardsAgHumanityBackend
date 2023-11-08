const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const path = require('path');
// const User = require('mongoose').model('User');

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
};


const strategy = new JwtStrategy(options, function (jwt_payload, done) {

    console.log(jwt_payload);

    // We will assign the `sub` property on the JWT to the database ID of user
    User.findOne({ _id: jwt_payload.sub }, function (err, user) {

        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }

    });

})


// TODO
module.exports = (passport) => {

    passport.use(strategy);
}