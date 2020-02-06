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

// Don’t use arrow functions when you use Mongoose (Schema.method())
// https://medium.com/@lucasdavidferrero/dont-use-arrow-functions-when-you-use-mongoose-schema-method-190b79f1640c
userSchema.method('comparePassword', function (password) {
    if (this.password === password) {
        return Promise.resolve({ err: null })
    }
    return Promise.resolve({ err: '패스워드가 일치하지 않습니다' })

})
const User = mongoose.model('User', userSchema)

module.exports = User