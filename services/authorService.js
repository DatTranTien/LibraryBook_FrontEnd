const axios = require('axios')
require('dotenv').config()

const headers = (req)=>{
   return axios.defaults.headers.get['Authorization'] = req.headers.authorization
}
exports.getAuthors = async(req)=>{
    headers(req)
    return await axios.get(process.env.url + 'authors')
}
exports.postAuthor = async(req)=>{
    headers(req)
    return await axios.post(process.env.url + 'authors',
        {
            name: req.body.name,
            publisher: req.body.publisher,
            book: req.body.bookId,
            website: req.body.website,
            twitter: req.body.twitter,
            about:req.body.about
        },
          {
            headers: {
              'Authorization': `Bearer ${req.headers.authorization}` 
            }
        }
        )
}
exports.getAuthorById = async(req)=>{
    axios.defaults.headers.get['Authorization'] = req.headers.authorization
    return await axios.get(process.env.url + 'authors/' + req.params.id)
}
exports.updateAuthorById = async(req)=>{
    return await axios.patch(process.env.url + 'authors/' + req.body.id,{
            name: req.body.name,
            publisher: req.body.publisher,
            website: req.body.website,
            twitter: req.body.twitter,
            about:req.body.about
    },
    {
        headers: {
          'Authorization': `Bearer ${req.headers.authorization}` 
        }
    }
    )
}
exports.deleteById = async(req)=>{
    headers(req)
    console.log("check url--->",process.env.url + 'authors/' + req.params.id)
    return await axios.delete(process.env.url + 'authors/' + req.params.id,
    {
        headers: {
          'Authorization': `Bearer ${req.headers.authorization}` 
        }
    }
    )
}