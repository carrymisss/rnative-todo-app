import passportJWT from "passport-jwt";
import config from "config";
import User from "../src/models/User";


const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt

const opts: any = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: config.get('jwtSecret'),
    algorithms: 'HS256'
}

const strategy = new JwtStrategy(opts, (jwt_payload: any, done: any) => {
    User.findById(jwt_payload.sub).then(user => {
        if (user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    }).catch(err => {
        done(err, false)
    })
})

export default (passport: any) => {
    passport.use(strategy)
}