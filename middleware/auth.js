const User = require('../model/user')

async function auth(req, res, next) {
    const { Authorization } = req.cookies

    try {
        await User.verifyToken(Authorization)
        next()
    } catch (err) {
        res.status(401).json({ isAuthenticated: false, message: err })
    }
}

module.exports = {
    auth
}