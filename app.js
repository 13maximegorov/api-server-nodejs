const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const passportStrategy = require('./middleware/passport.strategy')
const keys = require('./keys')
const app = express()

const PORT = process.env.PORT || 3000

// Подключение всех роутов
const authRouter = require('./routes/auth.router')
const friendsRouter = require('./routes/friends.router')
const usersRouter = require('./routes/users.router')
const groupsRouter = require('./routes/groups.router')


// Подключение к MongoDB
mongoose.connect(keys.MONGODB_URI, { 
    dbName: keys.DBNAME,
    useNewUrlParser: true, 
    useFindAndModify: false
})
    .then(() => console.log('MongoDB connected...'))
    .catch(error => console.error(error))


// Промежуточные ПО (Middleware)
// Подключение Passport.js и стратегии Passport-JWT
app.use(passport.initialize())
passport.use(passportStrategy)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


// Все маршруты API
app.use('/api/auth', authRouter)
app.use('/api/friends', friendsRouter)
app.use('/api/users', usersRouter)
app.use('/api/groups', groupsRouter)


// Запуск сервера
app.listen(PORT, () => {
    console.log(`The server is running on the port ${PORT}`)
})