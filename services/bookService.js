const axios = require('axios')
require('dotenv').config()

const headers = (req)=>{
   return axios.defaults.headers.get['Authorization'] = req.headers.authorization
}
exports.getBooks = async(req)=>{
    headers(req)
    return await axios.get(process.env.url + 'books')
}
exports.postBook = async(req)=>{
    headers(req)
    return await axios.post(process.env.url + 'books',
        {
            title: (req.body.title).toString(),
            author: (req.body.author).toString(),
            ISBN: (req.body.ISBN).toString(),
            numberOfPages: (req.body.numberOfPage),
            price: (req.body.price).toString(),
            yearPublished:(req.body.yearPublished).toString()
        },
          {
            headers: {
              'Authorization': `Bearer ${req.headers.authorization}` 
            }
        }
        )
}
exports.getBookById = async(req)=>{
    axios.defaults.headers.get['Authorization'] = req.headers.authorization
    return await axios.get(process.env.url + 'books/' + req.params.id)
}
exports.updateBookById = async(req)=>{
    return await axios.put(process.env.url + 'books/' + req.body.id,{
            title: req.body.title,
            author: req.body.author,
            ISBN: req.body.ISBN,
            numberOfPages: req.body.numberOfPage,
            price: req.body.price,
            yearPublished:req.body.yearPublished
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
    return await axios.delete(process.env.url + 'books/delete/' + req.params.id,
    {
        headers: {
          'Authorization': `Bearer ${req.headers.authorization}` 
        }
    }
    )
}