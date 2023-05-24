const express = require('express')
const authorRouter = express.Router()
let session = require('express-session')
const multer = require('multer');
const { getAuthorHandler, postAuthorHandler, updateAuthorHandler,addAuthorHandler,editAuthorHandler,deleteAuthorHandler } = require('../handlers/authorHandle');

// use middleware
authorRouter.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true
  }))



  authorRouter.get('/',getAuthorHandler)
  authorRouter.post('/',multer().none(),postAuthorHandler)
  authorRouter.post('/update',multer().none(),updateAuthorHandler)
  authorRouter.get('/addAuthor',addAuthorHandler)
  authorRouter.get('/:id',editAuthorHandler)
  authorRouter.get('/delete/:id',deleteAuthorHandler)

module.exports = authorRouter