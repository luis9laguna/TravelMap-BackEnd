//REQUIRED
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const { dbConnection } = require('./db/config')

//SERVER
const app = express()

//CORS
const optionsCors = {
    origin: process.env.FRONTEND_URL
}
app.use(cors(optionsCors))

//READ BODY
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//DATABASE
dbConnection()

//ROUTES
app.use('/api/user', require('./routes/user'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/post', require('./routes/post'))
app.use('/api/comment', require('./routes/comment'))
app.use('/api/like', require('./routes/like'))
app.use('/api/upload', require('./routes/upload'))

//LISTEN
app.listen(process.env.PORT, () => {
    console.log('Server in ' + process.env.PORT)
})