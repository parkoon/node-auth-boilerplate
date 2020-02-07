const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const saltRounds = 10
const secretKey = 'q1w2e3#$%qw'

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

    // 패스워드를 새로 설정하지 않는다면 그냥 패스
    // 이 부분이 없으면, 토큰을 생성하고 유저에 저장시킬 때
    // 패스워드를 또 다시 암호화하는 이슈가 발생
    if (!this.isModified('password')) next()

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

userSchema.method('generateToken', async function () {

    const user = this

    // Signing a token with 1 hour of expiration:
    const token = jwt.sign({
        data: { _id: user._id, email: user.email }
    }, secretKey, { expiresIn: '1h' })

    user.token = token
    try {
        await user.save()
        return Promise.resolve(token)
    } catch (err) {
        return Promise.reject(err)
    }
})

userSchema.static('verifyToken', async function (token) {

    try {
        const decoded = await jwt.verify(token, secretKey)
        const { data } = decoded
        const foundUser = await this.findOne({ _id: data._id, token })

        if (foundUser) return Promise.resolve()

        return Promise.reject('권한이 없는 사용자 입니다.')

    } catch (err) {
        return Promise.reject(err)
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User