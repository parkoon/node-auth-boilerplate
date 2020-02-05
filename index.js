const express = require('express')

const app = express()
const PORT = process.env.PORT || 3001

// Config
const config = require('./config')

// Database
const createDatabase = require('./db')
createDatabase(config.MONGO_URI)

// Router
const userRouter = require('./routes/user')

app.use('/api/v1/user', userRouter)


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})