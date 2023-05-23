const express = require('express')
const { getBookHandler } = require('../handlers/bookHandler')
const bookRouter = express.Router()

bookRouter.get('/',getBookHandler)

module.exports = bookRouter