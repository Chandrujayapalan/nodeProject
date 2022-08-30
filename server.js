const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const userController = require('./routes/productRoutes')
require("dotenv/config");
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => {
    console.log(error)
})
db.on('open', () => {
    console.log('Database is connected')
})
const app = express()
app.use(morgan('dev'))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server is running ${PORT}`)
 
})

app.use('/api', userController)
