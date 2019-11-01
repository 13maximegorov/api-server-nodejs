const Groups = require('../models/groups.model')
const Users = require('../models/users.model')

module.exports.createGroup = async (request, response) => {
    const groups = new Groups({
        title: request.body.title,
        description: request.body.description,
        img: request.file.filename
    })

    try {
        await groups.save()
        response.json({message: `Создана новая группа ${request.body.title}`})
    } catch(error) {
        response.status(500).json({message: error})
    }
}

module.exports.addMeGroup = async (request, response) => {
    const checkGroup = await Users.findById(request.params.id)

    if (!contains(checkGroup.groupsId, request.params.groupId)) {
        await Users.findByIdAndUpdate(request.params.id, {$addToSet: {groupsId: request.params.groupId}})

        await Groups.findByIdAndUpdate(request.params.groupId, {$addToSet: {usersId: request.params.id}})

        response.json({message: 'Вы успешно вступили в группу'})
    } else {
        response.status(409).json({message: 'Вы уже состоите в этой группе'}) 
    }
}

module.exports.addFriendGroup = async (request, response) => {
    const checkFriend = await Users.findById(request.params.userId)

    if (contains(checkFriend.friendsId, request.params.friendId)) {
        const friend = await Users.findById(request.params.friendId)

        if (!contains(friend.groupsId, request.params.groupId)) {
            await Users.findByIdAndUpdate(request.params.friendId, {$addToSet: {groupsId: request.params.groupId}})

            await Groups.findByIdAndUpdate(request.params.groupId, {$addToSet: {usersId: request.params.friendId}})

            response.json({message: 'Вы успешно добавили друга в группу'})
        } else {
            response.status(409).json({message: 'Он уже состоит в этой группе'}) 
        }
    } else {
        response.status(409).json({message: 'Для добавления в группу, сначала добавьте его в друзья'})
    }
}

module.exports.getGroups = async (request, response) => {
    const groups = await Groups.find()
    response.json(groups)
}

module.exports.getGroup = async (request, response) => {
    const group = await Groups.findById(request.params.id)
    response.json(group)
}

module.exports.getMeGroups = async (request, response) => {
    const user = await Users.findById(request.params.id)
    const meGroups = []

    for (let groupId of user.groupsId) {
        const group = await Groups.findById(groupId)
        meGroups.push(group)
    }

    response.json(meGroups)
}

module.exports.getMeGroupsUsers = async (request, response) => {
    const user = await Users.findById(request.params.id)
    const usersGroup = []

    if (contains(user.groupsId, request.params.groupId)) {
        const group = await Groups.findById(request.params.groupId)
        for (let userId of group.usersId) {
            const candidate = await Users.findById(userId).select('-password')
            usersGroup.push(candidate)
        }
        response.json(usersGroup)
    } else {
        response.status(409).json({message: 'Вы не можете просмотреть список участников, так как не состоите в этой группе'})
    }
}

module.exports.deleteGroup = async (request, response) => {
    await Groups.findByIdAndDelete(request.params.id)
    const users = await Users.find()
    for (let user of users) {
        await Users.updateOne({_id: user._id}, {$pull: {groupsId: request.params.id}})
    }
    response.json({message: 'Группа удалена'})
}


// Функция для проверки на сущестование в массиве
function contains(arr, element) {
    return arr.indexOf(element) != -1
}