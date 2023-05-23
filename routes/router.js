const express = require('express')
const { isEmpty } = require('../utilities/util')
const { messages } = require('../utilities/messages')
const { validateRegistration, validationLogin } = require('../validation/validation')
const router = express.Router()
const multer = require('multer');
let session = require('express-session')
const { postRegister, postLogin } = require('../services/userService')
const { getHomeHandler, getLoginHandler, getRegisterHandler, getAboutHandler, getLogOutHandler, postLoginHandler, postRegisterHandler } = require('../handlers/userHandler')

// use middleware
router.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true
  }))
  
router.get('/',getHomeHandler)
// router.get('/about',(req,res)=>{
//     res.render('about',{pagename:"About"})
// })
router.get('/login',getLoginHandler)
router.post('/login',multer().none(),postLoginHandler)
router.get('/register',getRegisterHandler)

router.post('/register', multer().none(),postRegisterHandler)
router.get('/about',getAboutHandler)

router.get("/logout",getLogOutHandler)

module.exports = router