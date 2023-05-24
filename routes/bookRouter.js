const express = require('express')
const { getBookHandler, addBookHandler, postBookhandler, editBookHandler, updateBookHandler, deleteBookHandler, getAllBookId } = require('../handlers/bookHandler')
const bookRouter = express.Router()
let session = require('express-session')
const multer = require('multer');


// use middleware
bookRouter.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true
  }))



bookRouter.get('/',getBookHandler)

bookRouter.post('/',multer().none(),postBookhandler)
bookRouter.post('/update',multer().none(),updateBookHandler)
bookRouter.get('/addBook',addBookHandler)
bookRouter.get('/:id',editBookHandler)
bookRouter.get('/delete/:id',deleteBookHandler)

module.exports = bookRouter