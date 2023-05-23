let session = require('express-session')
const { postLogin, postRegister } = require('../services/userService')
const { errorTemplate } = require('../templates/errorTemplate')
const { successTemplate } = require('../templates/successTemplate')
const { messages } = require('../utilities/messages')
const { isEmpty } = require('../utilities/util')
const { validationLogin, validateRegistration } = require('../validation/validation')

exports.getHomeHandler = (req,res)=>{
    session=req.session
  return successTemplate(res,'home','Home',null, session) 
}
exports.getLoginHandler = (req,res)=>{
    session=req.session
    return  successTemplate(res, 'login','Login',null,session)
}
exports.getRegisterHandler = (req,res)=>{
    session=req.session
  return  successTemplate(res, 'register','Register',null,session)
}
exports.getAboutHandler = (req,res)=>{
    session=req.session
    return successTemplate(res, 'about','About',null,session)
}
exports.getLogOutHandler = (req,res)=>{
    req.session.destroy(null)
    return successTemplate(res, 'home','Home',null,session)
}
exports.postLoginHandler =async (req,res)=>{
    const errors=validationLogin(req.body)
   try {
    session = req.session
    
    if (isEmpty(errors)) {
        console.log("first")
        const result = await postLogin(req.body)
        session.name=result.data.user.firstName
            session.logged = result.data.logged
            session.token = result.data.token

            return successTemplate(res,'home','Home', messages.succesful_login,session)
    }else{
        return errorTemplate(req,res,'login','Login',messages.faild_register)
    }
   } catch (e) {
    return errorTemplate(req,res,'login','Login',e.message,errors)
   }
}
exports.postRegisterHandler =async (req,res)=>{
    session=req.session
    const errors=validateRegistration(req.body)
   try {
   
    if (isEmpty(errors)) {
    const result = await postRegister(req.body)
    return successTemplate(res,'login',"Login",messages.succesful_register,session)
    
    //     postRegister(req.body) 
    //     .then((result)=>{
    //         res.render('login',{
    //             title:"Login",
    //             messages:result.data.messages
    //         })
    //     })
        // .catch((err)=>{
        //     console.log("errrrr--->",err)
        //     res.render('register',{
        //         title:"Register",
        //         messages: err?.response?.data?.error?.message
        //     })
        // })
        
    }else{
        return errorTemplate(req,res,'register','Registration',messages.faild_register)
    }
   } catch (e) {
    return errorTemplate(req,res,'register','Registration',e.message,errors)
   }
}