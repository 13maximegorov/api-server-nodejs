const {Router} = require('express')
const friendsRouter = Router()
const passport = require('passport')
const {addFriend} = require('../controllers/friends.controller')

// /api/friends/me/:userId/add/:friendId
friendsRouter.put('/me/:userId/add/:friendId', passport.authenticate('jwt', {session: false}), addFriend)

module.exports = friendsRouter