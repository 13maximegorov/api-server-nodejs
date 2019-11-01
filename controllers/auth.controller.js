const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const Users = require('../models/users.model')

module.exports.registration = async (request, response) => {
    const checkUser = await Users.findOne({email: request.body.email})
    
    if (!checkUser) {
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(request.body.password, salt)
    
        const user = new Users({
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: passwordHash
        })
            
        await user.save()
        response.json({message: 'Регистрация прошла успешно'})
    } else {
        response.status(409).json({message: 'Пользователь с такой электронной почтой существует'})
    }
}

module.exports.login = async (request, response) => {
    const user = await Users.findOne({email: request.body.email})

    if (user) {
        const isPasswordCorrect = await bcrypt.compare(request.body.password, user.password)

        if (isPasswordCorrect) {
            const token = jwt.sign({
                email: user.email,
                userId: user._id
            }, keys.JWT_SECRET, {expiresIn: 60 * 60})

            response.json({message: `Bearer Token: ${token}`})
        } else {
            response.status(401).json({message: 'Пароль неверен'})
        }
    } else {
        response.status(404).json({message: 'Пользователь не найден'})
    }
}