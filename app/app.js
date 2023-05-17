const express = require('express')
const cors=require('cors')
const router = require('../routes/router')
const app = express()

// cors middleware
app.use(cors())
// json request
app.use(express.json())

//middleware templating
app.set('view engine', 'ejs')
app.engine('ejs', require('ejs').__express)
// static ste for middleware use
app.use(express.static('public'))
app.use(express.static('views'))

app.use('/', router)


module.exports = app