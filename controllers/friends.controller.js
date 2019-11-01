const Users = require('../models/users.model')

module.exports.addFriend = async (request, response) => {
    const checkFriend = await Users.findById(request.params.userId)

    if (!contains(checkFriend.friendsId, request.params.friendId)) {
        await Users.findByIdAndUpdate(request.params.userId, {$addToSet: {friendsId: request.params.friendId}})

        await Users.findByIdAndUpdate(request.params.friendId, {$addToSet: {friendsId: request.params.userId}})

        response.json({message: 'Теперь вы стали друзьями'})
    } else {
        response.status(409).json({message: 'Вы уже друзья'})
    }
}


// Функция для проверки на сущестование в массиве
function contains(arr, element) {
    return arr.indexOf(element) != -1
}