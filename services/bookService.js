const axios = require('axios')
require('dotenv').config()


exports.getBooks = async(req)=>{
    axios.defaults.headers.get['Authorization'] = req.header.authorization
    return await axios.get(process.env.url + 'books')
}