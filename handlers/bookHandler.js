let session = require('express-session')
const { getBooks } = require('../services/bookService')
const { errorTemplate } = require('../templates/errorTemplate')
const { successTemplate } = require('../templates/successTemplate')

const getBookHandler = async (req,res)=>{
    try {
        console.log("check req",req.body)
        session = req.session
        req.headers.authorization = 'Bearer '+ session.token
        const books = await getBooks(req)
        console.log("books--->",books.data)
        console.log("session--->",session)
    successTemplate(res,'books',"Books","undefine", session,books.data.result)
    } catch (e) {
        return errorTemplate(
            req,
            res,
            'books',
            'Books',
            e.message,
            'undefined',
            'undefined',
        )
    }
    
}
module.exports = {getBookHandler}