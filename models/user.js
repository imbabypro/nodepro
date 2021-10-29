const mongoose = require("mongoose")
const usersSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,

    },
    userType: {
        type: String,
        default: 'user'
    }
})

module.exports = mongoose.model('users', usersSchema) 

