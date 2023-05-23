exports.errorTemplate=(req,res,pageName,title,message,errors)=>{
    res.render(pageName,{
        title:title,
        body: req.body,
        errs: errors,
        messages: message
    })
}