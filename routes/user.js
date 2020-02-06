const express = require('express')
const router = express.Router()

// Model
const User = require('../model/user')


router.post('/regist', async (req, res) => {

    const user = new User(req.body)

    try {

        const { _id, role, email, name } = await user.save()
        res.status(200).json({
            success: true,
            user: {
                _id, role, email, name
            }
        })

    } catch (err) {

        res.json({
            success: false,
            err
        })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        // 이메일을 이용해 사용자를 찾고
        const foundUser = await User.findOne({ email })
        if (!foundUser) return res.status(401).json({ success: false, message: '이메일을 확인해주세요.' })

        // 비밀번호가 일치하는지 체크
        const { err } = await foundUser.comparePassword(password)

        if (err) return res.status(401).json({ success: false, message: err })

        // 토큰 발행
        const token = await foundUser.generateToken()

        return res.json({
            success: true,
            token
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ err })
    }
})

module.exports = router