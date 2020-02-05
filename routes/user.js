const express = require('express')
const router = express.Router()


router.post('/regist', (req, res) => {

})

router.post('/login', (req, res) => {
    console.log('user login request')
})

module.exports = router