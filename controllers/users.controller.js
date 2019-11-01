const Users = require('../models/users.model')

module.exports.getUsers = async (request, response) => {
    const users = await Users.find()
    response.json(users)
}

module.exports.getUser = async (request, response) => {
    const user = await Users.findById(request.params.id)
    response.json(user)
}