const express = require('express')
const { isEmpty } = require('../utilities/util')
const { messages } = require('../utilities/messages')
const { validateRegistration, validationLogin } = require('../validation/validation')
const router = express.Router()
const multer = require('multer');
let session = require('express-session')
const { postRegister, postLogin } = require('../services/userService')

// use middleware
router.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true
  }))
  
router.get('/',(req,res)=>{
    session=req.session
    res.render('home',{pagename:"Home",session:session})
})
// router.get('/about',(req,res)=>{
//     res.render('about',{pagename:"About"})
// })
router.get('/login',(req,res)=>{
    res.render('login',{pagename:"Login"})
})
router.post('/login',multer().none(),(req,res)=>{
    session = req.session
    const errors=validationLogin(req.body)
    console.log("req.body===>",req.body)
    if (isEmpty(errors)) {
        console.log("first")
        postLogin(req.body).then(result=>{
            session.name=result.data.user.firstName
            session.logged = result.data.logged
            session.token = result.data.token
            res.render('home',{
                pagename:"Home",
                messages: result.data.message,
                session: session
            })
        }).catch(err=>{
            console.log("second--->",err?.response?.data)
            res.render('login',{
                pagename:'Login',
                messages: err?.response?.data?.error?.message
            })
        })
    }else{
        res.render('login',{
            pagename:'Login',
            body: req.body,
            errs: errors,
            messages: messages.faild_login
        })
    }
})
router.get('/register',(req,res)=>{
    res.render('register',{pagename:"Register"})
})
router.post('/register', multer().none(),(req,res)=>{
    const errors=validateRegistration(req.body)
    console.log("req.body===>",req.body)
    if (isEmpty(errors)) {
        postRegister(req.body)
        .then((result)=>{
            res.render('login',{
                pagename:"Login",
                messages:result.data.messages
            })
        })
        .catch((err)=>{
            console.log("errrrr--->",err)
            res.render('register',{
                pagename:"Register",
                messages: err?.response?.data?.error?.message
            })
        })
    }else{
        res.render('register',{
            pagename:'Registration',
            body: req.body,
            errs: errors,
            messages: messages.faild_register
        })
    }
})
router.get('/about',(req,res)=>{
    session=req.session
    res.render('about',{pagename:"About", session:session})
})

router.get("/logout",(req,res)=>{
    console.log("first",session)
    req.session.destroy(null)
    console.log("second",session)
    res.render('home',{pagename:"Home"})
})

module.exports = router