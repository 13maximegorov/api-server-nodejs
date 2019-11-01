const {Router} = require('express')
const groupsRouter = Router()
const passport = require('passport')
const upload = require('../middleware/upload')
const {createGroup, addMeGroup, addFriendGroup, getGroups, getGroup, getMeGroups, getMeGroupsUsers, deleteGroup} = require('../controllers/groups.controller')

// /api/groups/create
groupsRouter.post('/create', passport.authenticate('jwt', {session: false}), upload.single('img'), createGroup)

// /api/groups/:groupId/me/add/:userId
groupsRouter.put('/:groupId/me/add/:id', passport.authenticate('jwt', {session: false}), addMeGroup)

// /api/groups/:groupId/me/:userId/friends/add/:friendId
groupsRouter.put('/:groupId/me/:userId/friends/add/:friendId', passport.authenticate('jwt', {session: false}), addFriendGroup)

// /api/groups/get
groupsRouter.get('/get', getGroups)

// /api/groups/get/:groupId
groupsRouter.get('/get/:id', getGroup)

// /api/groups/get/me/:userId
groupsRouter.get('/get/me/:id', getMeGroups)

// /api/groups/:groupId/me/:userId/users
groupsRouter.get('/:groupId/me/:id/users', getMeGroupsUsers)

// /api/groups/delete/:groupId
groupsRouter.delete('/delete/:id', passport.authenticate('jwt', {session: false}), deleteGroup)

module.exports = groupsRouter