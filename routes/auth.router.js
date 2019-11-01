const {Router} = require('express')
const authRouter = Router()
const {registration, login} = require('../controllers/auth.controller')

// /api/auth/registration
authRouter.post('/registration', registration)

// /api/auth/login
authRouter.post('/login', login)

module.exports = authRouter