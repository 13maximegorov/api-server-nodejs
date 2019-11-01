const {Strategy, ExtractJwt} = require('passport-jwt')
const Users = require('../models/users.model')
const keys = require('../keys')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.JWT_SECRET,

}

module.exports = new Strategy(options, async (payload, done) => {
    try {
        const user = Users.findById(payload.userId).select('id')

        if (user) {
            done(null, user)
        } else {
            done(null, false)
        }
    } catch(error) {
        console.error(error)
    }
})