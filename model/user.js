const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        maxlength: 20,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true

    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    token: String,
    tokenExp: Number,
    role: {
        type: Number,
        default: 0
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User