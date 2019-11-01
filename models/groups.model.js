const {model, Schema} = require('mongoose')

const groupsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    usersId: Array
})

module.exports = model('groups', groupsSchema)

