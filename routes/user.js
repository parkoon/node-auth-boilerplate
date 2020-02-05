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

router.post('/login', (req, res) => {
    console.log('user login request')
})

module.exports = router