let session = require('express-session')
const { getAuthors, postAuthor, getAuthorById, updateAuthorById, deleteById } = require('../services/authorService')
const { getBookIds } = require('../services/bookService')
const { errorTemplate } = require('../templates/errorTemplate')
const { successTemplate } = require('../templates/successTemplate')

const getAuthorHandler = async (req,res)=>{
    try {
        session = req.session
        req.headers.authorization = 'Bearer '+ session.token
        const authors = await getAuthors(req)
        session.authors=authors.data.result
    successTemplate(res,'authors',"authors",authors.data.message, session,authors.data.result)
    } catch (e) {
        return errorTemplate(
            req,
            res,
            'authors',
            'authors',
            e.message,
            'undefined',
            'undefined',
        )
    }
    
}
const addAuthorHandler = async (req,res)=>{
    console.log("check add init--->",req.body)
    try {
        session = req.session
        req.headers.authorization = 'Bearer '+ session.token
        const result =await getBookIds(req)
        console.log("check result========>",result)
return    successTemplate(res,'addAuthor',"Add a author",null, session,result.data.result)
    } catch (e) {
        return errorTemplate(
            req,
            res,
            'authors',
            'Authors',
            e.message,
            'undefined',
            'undefined',
        )
    }
}
const editAuthorHandler = async (req,res)=>{
    try {
        session = req.session
        req.headers.authorization = 'Bearer '+ session.token
        const author =await getAuthorById(req)
    return    successTemplate(res,'editAuthor',"Edit a author",author.data.message, session, author.data.result)
    } catch (e) {
        return errorTemplate(
            req,
            res,
            'authors',
            'Authors',
            e.message,
            'undefined',
            'undefined',
        )
    }
    
}
const updateAuthorHandler = async (req,res)=>{
    try {
        session = req.session
        req.headers.authorization = 'Bearer '+ session.token
        const result =await updateAuthorById(req)
        const authors = await getAuthors(req)
    return    successTemplate(res,'authors',"Authors",authors.data.message, session, authors.data.result)
    } catch (e) {
        return errorTemplate(
            req,
            res,
            'authors',
            'Authors',
            e.message,
            'undefined',
            'undefined',
        )
    }
    
}
const postAuthorHandler = async (req,res)=>{
    try {
        session = req.session
        req.headers.authorization = 'Bearer '+ session.token
        const author = await postAuthor(req)
        const authors = await getAuthors(req)
    return    successTemplate(res,'authors',"Authors",authors.data.message, session, authors.data.result)
        // successTemplate(res,'authors','Authors', author.data.message, session,authors.data.result)
    } catch (e) {
        return errorTemplate(
            req,
            res,
            'authors',
            'Authors',
            e.message,
            'undefined',
            'undefined',
        )
    }
    
}
const deleteAuthorHandler = async (req,res)=>{
    console.log("first deleteAuthorHandler")
    try {
        session = req.session
        req.headers.authorization = 'Bearer '+ session.token
        const result = await deleteById(req)
        console.log("second",result)
        const authors = await getAuthors(req)
        console.log("three",authors)
    return successTemplate(res,'authors',"Authors",result.data.message, session, authors.data.result)
    } catch (e) {
        return errorTemplate(
            req,
            res,
            'authors',
            'Authors',
            e.message,
            'undefined',
            'undefined',
        )
    }
    
}
module.exports = {getAuthorHandler,addAuthorHandler,postAuthorHandler,editAuthorHandler,updateAuthorHandler,deleteAuthorHandler}