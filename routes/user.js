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
        const foundUser = await User.findOne({ email })
        if (!foundUser) return res.status(401).json({ success: false, message: '이메일을 확인해주세요.' })

        if (foundUser.password !== password) return res.status(401).json({ success: false, message: '비밀번호를 확인해주세요.' })

        return res.json({
            success: true,
        })
    } catch (err) {
        res.status(500).json({ err })
    }
})

module.exports = router