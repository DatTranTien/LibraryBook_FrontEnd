let session = require('express-session')
const { getBooks, postBook, getBookById, updateBookById, deleteById, getBookIds } = require('../services/bookService')
const { errorTemplate } = require('../templates/errorTemplate')
const { successTemplate } = require('../templates/successTemplate')

const getBookHandler = async (req,res)=>{
    try {
        session = req.session
        req.headers.authorization = 'Bearer '+ session.token
        const books = await getBooks(req)
        session.books=books.data.result
    successTemplate(res,'books',"Books",books.data.message, session,books.data.result)
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
const addBookHandler = async (req,res)=>{
    try {
        session = req.session
    successTemplate(res,'addBook',"Add a book",null, session)
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
const editBookHandler = async (req,res)=>{
    try {
        session = req.session
        req.headers.authorization = 'Bearer '+ session.token
        const book =await getBookById(req)
    return    successTemplate(res,'editBook',"Edit a book",book.data.message, session, book.data.result)
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
const updateBookHandler = async (req,res)=>{
    try {
        session = req.session
        req.headers.authorization = 'Bearer '+ session.token
        const result =await updateBookById(req)
        const books = await getBooks(req)
    return    successTemplate(res,'books',"Books",books.data.message, session, books.data.result)
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
const postBookhandler = async (req,res)=>{
    try {
        session = req.session
        req.headers.authorization = 'Bearer '+ session.token
        const book = await postBook(req)
        const books = await getBooks(req)
        const bookAll = session.books
        books.push(book.data.result)
        successTemplate(res,'books','Books', book.data.message, session,bookAll.data.result)
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
const deleteBookHandler = async (req,res)=>{
    console.log("first deleteBookHandler")
    try {
        session = req.session
        req.headers.authorization = 'Bearer '+ session.token
        const result = await deleteById(req)
        console.log("second",result)
        const books = await getBooks(req)
        console.log("three",books)
    return successTemplate(res,'books',"Books",result.data.message, session, books.data.result)
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
const getAllBookId = async (req,res)=>{
    console.log("first deleteBookHandler")
    try {
        session = req.session
        req.headers.authorization = 'Bearer '+ session.token
        const result = await getBookIds(req)
    return successTemplate(res,'addAuthor',"Add an author",undefined, session, result.data.result)
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
module.exports = {getAllBookId,getBookHandler,addBookHandler,postBookhandler,editBookHandler,updateBookHandler,deleteBookHandler}