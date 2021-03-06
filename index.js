const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 3003

// Morgan
const morgan = require('morgan')
app.use(morgan('dev'))

// CORS
const cors = require('cors')
app.use(cors())

// Cookie Parser
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// Body parser
// for json
app.use(bodyParser.json())
// for x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

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
