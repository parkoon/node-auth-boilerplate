const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 3001

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
const productRouter = require('./routes/product')

app.use('/api/v1/user', userRouter)
app.use('/api/v1/product', productRouter)


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})