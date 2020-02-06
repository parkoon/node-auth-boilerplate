const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const saltRounds = 10

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

userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(saltRounds)
        const hash = await bcrypt.hash(this.password, salt)
        this.password = hash
        next()

    } catch (err) {
        next(err)
    }
})

// Don’t use arrow functions when you use Mongoose (Schema.method())
// https://medium.com/@lucasdavidferrero/dont-use-arrow-functions-when-you-use-mongoose-schema-method-190b79f1640c
userSchema.method('comparePassword', async function (password) {

    try {
        const isMatched = await bcrypt.compare(password, this.password)
        if (isMatched) return Promise.resolve({ err: null })
        return Promise.resolve({ err: '패스워드가 일치하지 않습니다.' })

    } catch (err) {
        console.error(err)
        return Promise.reject({ err })
    }


})
const User = mongoose.model('User', userSchema)

module.exports = User