const axios = require('axios')
require('dotenv').config()

exports.postRegister = async (body) =>{
    const result = await axios.post(process.env.url + '/register',{
        firstName: body.firstName,
        lastName: body.lastName,
        address: body.address,
        city: body.city,
        state:body.state,
        zipCode:body.zipcode,
        email:body.emailAddress,
        password:body.password
    })
    console.log("result post===>",result)
    return result
}
exports.postLogin = async (body) =>{
    const result = axios.post(process.env.url + '/login',{
        email:body.emailAddress,
        password:body.password
    })
    return result
}