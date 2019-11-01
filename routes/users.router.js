const {Router} = require('express')
const usersRouter = Router()
const {getUsers, getUser} = require('../controllers/users.controller')

// /api/users/get
usersRouter.get('/get', getUsers)

// /api/users/get/:id
usersRouter.get('/get/:id', getUser)


module.exports = usersRouter